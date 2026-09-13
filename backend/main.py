from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Job


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI()


# -------------------------
# CORS
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://jobtracker-4k47.onrender.com",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Database Dependency
# -------------------------

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# -------------------------
# Pydantic Schemas
# -------------------------

class JobCreate(BaseModel):
    company: str
    position: str
    status: str
    location: str | None = None
    salary: str | None = None
    applied_date: str | None = None
    job_url: str | None = None
    notes: str | None = None


class JobUpdate(BaseModel):
    company: str | None = None
    position: str | None = None
    status: str | None = None
    location: str | None = None
    salary: str | None = None
    applied_date: str | None = None
    job_url: str | None = None
    notes: str | None = None


# -------------------------
# HOME
# -------------------------

@app.get("/")
def home():
    return "Job Tracker API is running"


# -------------------------
# GET ALL JOBS
# -------------------------

@app.get("/jobs")
def get_jobs(
    company: str | None = None,
    status: str | None = None,
    db: Session = Depends(get_db)
):

    query = db.query(Job)

    if company:
        query = query.filter(Job.company == company)

    if status:
        query = query.filter(Job.status == status)

    return query.all()


# -------------------------
# GET ONE JOB
# -------------------------

@app.get("/jobs/{job_id}")
def get_job(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = db.query(Job).filter(Job.id == job_id).first()

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return job


# -------------------------
# CREATE JOB
# -------------------------

@app.post("/jobs")
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db)
):

    new_job = Job(
        company=job.company,
        position=job.position,
        status=job.status,
        location=job.location,
        salary=job.salary,
        applied_date=job.applied_date,
        job_url=job.job_url,
        notes=job.notes
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return new_job


# -------------------------
# UPDATE JOB
# -------------------------

@app.put("/jobs/{job_id}")
def update_job(
    job_id: int,
    job_data: JobUpdate,
    db: Session = Depends(get_db)
):

    job = db.query(Job).filter(Job.id == job_id).first()

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    update_data = job_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(job, key, value)

    db.commit()
    db.refresh(job)

    return job


# -------------------------
# DELETE JOB
# -------------------------

@app.delete("/jobs/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = db.query(Job).filter(Job.id == job_id).first()

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    db.delete(job)
    db.commit()

    return {
        "message": "Job deleted successfully"
    }