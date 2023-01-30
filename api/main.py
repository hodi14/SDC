import json
from fastapi import FastAPI, Request
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from api.model import *
from app import app, logger
import time
model_api = APIRouter()

@app.get("/tasks")
def tasks():
    query="""SELECT *
        FROM tasks t  
        WHERE t.record_count  = ( SELECT MIN(record_count) FROM tasks )
         AND (last_record is NULL  OR last_record  >= now() - interval 5 minute)
         LIMIT 5;"""
    mycursor = app.mydb.cursor()

    mycursor.execute(query)

    myresult = mycursor.fetchall()

    query="""UPDATE tasks
            SET last_record = '"""+time.strftime('%Y-%m-%d %H:%M:%S')+"""'
            WHERE id >=""" +str(min([i[-1] for i in myresult]))+""" AND id<= """+str(max([i[-1] for i in myresult]))
    mycursor = app.mydb.cursor()

    mycursor.execute(query)
    app.mydb.commit()

    l=[{"text":i[0],"IS_HTML":i[2]} for i in myresult]
    return l




@app.put("/userInfo/{rec_id}")
def userInfo_update(rec_id: str,data: userInfo_up) -> JSONResponse:
    #TEST RECORD EXISTS
    query = " SELECT * FROM users WHERE  phone=" + "'" + str(rec_id) + "' OR  email='" + str(rec_id) + "'"
    mycursor = app.mydb.cursor()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult)==0:
        return JSONResponse(
            content={"update": "No such record for update"}, status_code=200
        )
    # updating
    query="""UPDATE users
        SET """
    keys=["name", "gender", "email", "phone", "birth_year", "password", "study_level", "dailect"]
    values=[data.name, data.gender, data.email, data.phone_number, data.birth_year, data.password,data.study, data.dailect]
    s=''
    for z,val in enumerate(values):
        if val is not None:
            s+=keys[z]+" = '"+str(val)+"',"
    if len(s)>0:
        s=s[:-1]
    query+=s
    query+=" WHERE email = '"+str(rec_id)+"' OR phone= '"+str(rec_id)+"' ;"
    mycursor = app.mydb.cursor()

    mycursor.execute(query)
    app.mydb.commit()
    return JSONResponse(
        content={"update": "Successful"}, status_code=200
    )
@model_api.get("/userInfo/{id}")
def userInfo(id:str) -> JSONResponse:
    query = "SELECT * FROM users Where phone=" + "'" + str(id) + "' OR  email='" + str(id) + "'"

    mycursor = app.mydb.cursor()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult)==0:
        return JSONResponse(
            content={"user_info": []}, status_code=200
        )

    keys=["phone_number","name","email","birth_year","dailect","study_level","gender"]
    myresult=myresult[0]
    return dict(zip(keys, myresult[:1]+myresult[2:]))
    #return myresult



@model_api.post("/signup")
def signup(data: signup) -> JSONResponse:
    # verification if user exusts
    query = "SELECT * FROM users Where "
    if data.phone_number is not None:
        query += " phone=" + "'" + str(data.phone_number) + "'"
        if data.email is not None:
            query+=" OR "
    if data.mail is not None:
        query += " mail='" + str(data.mail) + "'"
    mycursor = app.mydb.cursor()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult)>0:
        return JSONResponse(
            content={"signup": "phone number or email already exits"}, status_code=200
        )
    # create user
    query="""
    INSERT INTO users
    (name, gender,email,phone,birth_year,password, study_level, dailect)
    VALUES ( "%s", "%s" , "%s", "%s", "%s", "%s")
    """
    values=[data.name, data.gender, data.email, data.phone_number, data.birth_year, data.password,data.study, data.dailect]
    for z,val in enumerate(values):
        if val== None:
            values[z]="NULL"
    query=query%tuple(values)
    with app.mydb.cursor() as cursor:
        cursor.execute(query)
        app.mydb.commit()
        return JSONResponse(
            content={"signup": "Successful"}, status_code=200
        )



@model_api.post("/login")
def login(data: Auth) -> JSONResponse:
    query="SELECT * FROM users Where "
    if data.phone_number is not None:
        query+=" phone="+"'"+str(data.phone_number)+"'"
    elif data.mail is not None:
        query += " mail='" + str(data.mail)+"'"
    else:
        raise Exception("not valid data")
    query+=" LIMIT 1"
    mycursor = app.mydb.cursor()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult)==0:
        return JSONResponse(
            content={"login": "False"}, status_code=200
        )
    myresult=myresult[0]

    if myresult[1]==data.password:
        return JSONResponse(
            content={"login":"True"}, status_code=200
        )
    else:
        return JSONResponse(
            content={"login": "False"}, status_code=200
        )
