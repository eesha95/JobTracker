from sqlalchemy import Column, Integer, String
from database import Base


class Job(Base):
    
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    company = Column(String, nullable=False)

    position = Column(String, nullable=False)

    location = Column(String, nullable=True)

    status = Column(String, nullable=False)

    salary = Column(String, nullable=True)

    applied_date = Column(String, nullable=True)

    job_url = Column(String, nullable=True)

    notes = Column(String, nullable=True)
    