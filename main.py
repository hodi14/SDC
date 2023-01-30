import os
from concurrent.futures import ThreadPoolExecutor
import uvicorn
from dotenv import load_dotenv
from api import router
from app import app, logger
import mysql.connector



__author__ = "Fwad abdi"

app.include_router(router)


@app.on_event("startup")
def startup() -> None:
    load_dotenv()
    try:
        app.thread_pool = ThreadPoolExecutor()
    except Exception as error:
        raise Exception(error)
    try:
        app.mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="DB"
        )
    except Exception as error:
        raise Exception(error)

    logger.info("App started successfully")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
