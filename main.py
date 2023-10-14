import os
from concurrent.futures import ThreadPoolExecutor
import uvicorn
from dotenv import load_dotenv
from api import router
from app import app, logger
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]

app.add_middleware(
            CORSMiddleware,
                allow_origins=origins,
                allow_credentials=True,
               allow_methods=["*"],
                allow_headers=["*"],
            )

__author__ = "Fwad abdi"

app.include_router(router)

def checkTableExists(dbcon, tablename):
    dbcur = dbcon.cursor()
    dbcur.execute("""
        SELECT COUNT(*)
        FROM information_schema.tables
        WHERE table_name = '""" + tablename +"'")
    if dbcur.fetchone()[0] >0:
        dbcur.close()
        return True

    dbcur.close()
    return False

@app.on_event("startup")
def startup() -> None:
    load_dotenv()
    try:
        app.thread_pool = ThreadPoolExecutor()
    except Exception as error:
        raise Exception(error)
    try:
        app.host="localhost"
        app.user="root"
        app.password="root"
        app.database="DB"
        app.mydb = mysql.connector.connect(
        host=app.host,
        user=app.user,
        password=app.password,
        database=app.database
        )
        if not checkTableExists( app.mydb,"tasks"):
            dbcur = app.mydb.cursor()
            dbcur.execute("""
                        CREATE TABLE `tasks` (
                          `text` varchar(5000) DEFAULT NULL,
                          `HTML` tinyint(1) DEFAULT NULL,
                          `record_count` int DEFAULT '0',
                          `last_record` timestamp NULL DEFAULT NULL,
                          `id` int NOT NULL AUTO_INCREMENT,
                          PRIMARY KEY (`id`)
                        ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
                    """)
        if not checkTableExists( app.mydb,"users"):
            dbcur = app.mydb.cursor()
            dbcur.execute("""
                        CREATE TABLE `users` (
                              `phone` varchar(100) DEFAULT NULL,
                              `password` varchar(100) NOT NULL,
                              `name` varchar(100) DEFAULT NULL,
                              `email` varchar(100) DEFAULT NULL,
                              `birth_year` varchar(100) DEFAULT NULL,
                              `dailect` varchar(100) DEFAULT NULL,
                              `study_level` varchar(100) DEFAULT NULL,
                              `gender` varchar(100) DEFAULT NULL
                            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
                    """)
        if not checkTableExists( app.mydb,"recorded"):
            dbcur = app.mydb.cursor()
            dbcur.execute("""
                        CREATE TABLE `recorded` (
                          `user_email` varchar(100) DEFAULT NULL,
                          `user_phone` varchar(100) DEFAULT NULL,
                          `task_id` int NOT NULL,
                          `created_at` timestamp NULL DEFAULT NULL,
                          `id` int NOT NULL AUTO_INCREMENT,
                          PRIMARY KEY (`id`)
                        ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
                    """)


    except Exception as error:
        raise Exception(error)

    logger.info("App started successfully")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
