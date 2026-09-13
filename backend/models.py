from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    company = Column(String, nullable=False)
    position = Column(String, nullable=False)
    status = Column(String, nullable=False)

    location = Column(String, nullable=True)
    salary = Column(String, nullable=True)
    applied_date = Column(String, nullable=True)
    job_url = Column(String, nullable=True)

    notes = Column(Text, nullable=True)