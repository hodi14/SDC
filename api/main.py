import json
from fastapi import FastAPI, Request
from fastapi import APIRouter, File, UploadFile, Depends
from fastapi.responses import JSONResponse
from api.model import *
from app import app, logger
import time
import shutil
import os
import mysql.connector


model_api = APIRouter()

def cursor_instance():
    try:
        return app.mydb.cursor()
    except:
        app.mydb = mysql.connector.connect(
            host=app.host,
            user=app.user,
            password=app.password,
            database=app.database
        )
        return app.mydb.cursor()


@app.get("/tasks/{id}")
def tasks(id: str) -> JSONResponse:
    query = """SELECT *
        FROM tasks t  
        WHERE t.record_count  = ( SELECT MIN(record_count) FROM tasks )
         AND (last_record is NULL  OR now() >= last_record + interval 30 minute)
         LIMIT 100;"""
    mycursor = cursor_instance()

    mycursor.execute(query)

    myresult = mycursor.fetchall()

    query = """UPDATE tasks
            SET last_record = '""" + time.strftime('%Y-%m-%d %H:%M:%S') + """'
            WHERE id IN ("""
    for rec in myresult:
        query+=str(rec[-1])+" ,"
    query=query[:-1]+");"
    mycursor = cursor_instance()

    mycursor.execute(query)
    app.mydb.commit()

    l = [{"text": i[0], "IS_HTML": i[2]} for i in myresult]
    return l


@app.put("/userInfo/{rec_id}")
def userInfo_update(rec_id: str, data: userInfo_up) -> JSONResponse:
    # TEST RECORD EXISTS
    query = " SELECT * FROM users WHERE  phone=" + "'" + str(rec_id) + "' OR  email='" + str(rec_id) + "'"
    mycursor = cursor_instance()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult) == 0:
        return JSONResponse(
            content={"update": "No such record for update"}, status_code=200
        )
    # updating
    query = """UPDATE users
        SET """
    keys = ["name", "gender", "email", "phone", "birth_year", "password", "study_level", "dialect"]
    values = [data.name, data.gender, data.email, data.phone_number, data.birth_year, data.password, data.study,
              data.dialect]
    s = ''
    for z, val in enumerate(values):
        if val is not None:
            s += keys[z] + " = '" + str(val) + "',"
    if len(s) > 0:
        s = s[:-1]
    query += s
    query += " WHERE email = '" + str(rec_id) + "' OR phone= '" + str(rec_id) + "' ;"
    mycursor = cursor_instance()

    mycursor.execute(query)
    app.mydb.commit()
    return JSONResponse(
        content={"update": "Successful"}, status_code=200
    )


@model_api.get("/userInfo/{id}")
def userInfo(id: str) -> JSONResponse:
    query = "SELECT * FROM users Where phone=" + "'" + str(id) + "' OR  email='" + str(id) + "'"

    mycursor = cursor_instance()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult) == 0:
        return JSONResponse(
            content={"user_info": []}, status_code=200
        )

    keys = ["phone_number", "name", "email", "birth_year", "dialect", "study_level", "gender"]
    myresult = myresult[0]
    return dict(zip(keys, myresult[:1] + myresult[2:]))
    # return myresult


@model_api.post("/signup")
def signup(data: signup) -> JSONResponse:
    # verification if user exusts
    query = "SELECT * FROM users Where "
    if data.phone_number is not None:
        query += " phone=" + "'" + str(data.phone_number) + "'"
        if data.email is not None:
            query += " OR "
    if data.email is not None:
        query += " email='" + str(data.email) + "'"
    mycursor = cursor_instance()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult) > 0:
        return JSONResponse(
            content={"signup": "phone number or email already exits"}, status_code=200
        )
    # create user
    query = """
    INSERT INTO users
    (name, gender,email,phone,birth_year,password, study_level, dialect)
    VALUES (  """
    values = [data.name, data.gender, data.email, data.phone_number, data.birth_year, data.password, data.study,
              data.dialect]
    for z, val in enumerate(values):
        if val == None:
            values[z] = "NULL"
        query +=' "'+ values[z]+'" ,'
    query=query[:-1]+")"
    with cursor_instance() as cursor:
        cursor.execute(query)
        app.mydb.commit()
        return JSONResponse(
            content={"signup": "Successful",
                #     'phone': data.phone_number, 'password': data.password,
                 #    'name': data.name, 'email': data.email,
                  #   'birth_year': data.birth_year, 'dialect': data.dialect,
                   #  'study_level': data.study, 'gender': data.gender,
                     }, status_code=200
        )


@model_api.post("/login")
def login(data: Auth) -> JSONResponse:
    query = "SELECT * FROM users Where "
    if data.phone_number is not None:
        query += " phone=" + "'" + str(data.phone_number) + "'"
    elif data.email is not None:
        query += " mail='" + str(data.email) + "'"
    else:
        raise Exception("not valid data")
    query += " LIMIT 1"
    mycursor = cursor_instance()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult) == 0:
        return JSONResponse(
            content={"login": "False"}, status_code=200
        )
    myresult = myresult[0]

    if myresult[1] == data.password:
        return JSONResponse(
            content={"login": "True",
                     'phone':myresult[0], 'password':myresult[1],
                     'name':myresult[2], 'email':myresult[3],
                     'birth_year':myresult[4], 'dialect':myresult[5],
                     'study_level':myresult[6], 'gender':myresult[7] }, status_code=200
        )
    else:
        return JSONResponse(
            content={"login": "False"}, status_code=200
        )


@model_api.get("/user_list")
def user_list() -> JSONResponse:
    query = "SELECT * FROM users"
    mycursor = cursor_instance()
    mycursor.execute(query)
    myresult = mycursor.fetchall()
    keys = ["phone_number", "name", "email", "birth_year", "dialect", "study_level", "gender"]
    return [dict(zip(keys, rec[:1] + rec[2:])) for rec in myresult]


@model_api.get("/tasks_list/{id}")
def user_tasks(id: str) -> JSONResponse:
    query = "SELECT * FROM recorded where user_phone='" + id + "' or user_email='" + id+"'"
    mycursor = cursor_instance()
    mycursor.execute(query)
    myresult = mycursor.fetchall()
    keys = ["user_email", "user_phone", "task_id", "created_at","id"]
    return [dict(zip(keys, rec)) for rec in myresult]


@model_api.get("/task_detail/{id}")
def user_tasks(id: str) -> JSONResponse:
    query = "SELECT * FROM tasks where id=" + id
    mycursor = cursor_instance()
    mycursor.execute(query)
    myresult = mycursor.fetchall()
    keys = ["text", "is_html", "read_count", "updated_at", "id"]
    return [dict(zip(keys, rec)) for rec in myresult]


@app.post("/upload-file/")
def create_upload_file(detail: upload = Depends(), uploaded_file: UploadFile=File(...)):
    # check if id exists
    #ploaded_file=0

    query = "SELECT * FROM users where "
    if detail.user_email is not None:
            query=query+" email="+detail.user_email
            user_dir=detail.user_email
            if detail.user_phone is not None:
                query+=" and phone = "+str(detail.user_phone)
    elif detail.user_phone is not None:
            query += " phone = "+str(detail.user_phone)
            user_dir = detail.user_phone
    query +=" LIMIT 1"
    mycursor = cursor_instance()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult) == 0:
        raise Exception("user not exits")

    # update tasks table
    query = "select * from tasks where id = " + str(detail.task_id)
    mycursor = cursor_instance()
    mycursor.execute(query)
    myresult = mycursor.fetchall()
    count = myresult[0][2]

    query = """UPDATE tasks
                SET record_count = """ + str(count + 1) + """
                WHERE id =""" + str(detail.task_id)
    mycursor = cursor_instance()
    mycursor.execute(query)
    app.mydb.commit()

    #get max_id in recorded table
    query = "SELECT max(id) from recorded "
    mycursor = cursor_instance()
    mycursor.execute(query)
    myresult = mycursor.fetchall()
    max_id=myresult[0][0]
    record_id=max_id+1
    # create a record in recoded table

    query = """
    INSERT INTO recorded
    (user_email, user_phone,task_id,created_at,noise,id)
    VALUES ( "%s", "%s" , "%s", "%s",%s)
    """
    values = [detail.user_email, detail.user_phone, detail.task_id, time.strftime('%Y-%m-%d %H:%M:%S') ,detail.noise,record_id]
    for z, val in enumerate(values):
        if val == None:
            values[z] = "NULL"
    query = query % tuple(values)
    with cursor_instance() as cursor:
        cursor.execute(query)
        app.mydb.commit()
        if not os.path.isdir('./files/'+user_dir):
            os.system("mkdir ./files/"+user_dir)

    file_location = f"files/{record_id}.wav"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(uploaded_file.file, file_object)
    return {"info": f"file '{uploaded_file.filename}' saved at '{file_location}'"}

@model_api.post("/edit")
def edit(data: edit) -> JSONResponse:
    # verification if user exusts
    query = "SELECT * FROM users Where "
    if data.phone_number is not None:
        query += " phone=" + "'" + str(data.phone_number) + "'"
        if data.email is not None:
            query += " OR "
    if data.email is not None:
        query += " email='" + str(data.email) + "'"
    mycursor = cursor_instance()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult) == 0:
        return JSONResponse(
            content={"signup": "phone number or email already exits"}, status_code=200
        )
    # edit user
    query = """
    UPDATE users
    SET """
    keys = ["name", "gender", "email", "phone", "birth_year", "password", "study_level",
              "dialect"]
    values = [data.name, data.gender, data.email, data.phone_number, data.birth_year, data.password, data.study,
              data.dialect]
    for key,val in zip(keys,values):
        if val is not None:
            query+=key + " = '"+str(val)+"', "
    query=query[:-2]+"\n WHERE "

    if data.phone_number is not None:
        query += " phone=" + "'" + str(data.phone_number) + "'"
        if data.email is not None:
            query += " OR "
    if data.email is not None:
        query += " email='" + str(data.email) + "'"

    with cursor_instance() as cursor:
        cursor.execute(query)
        app.mydb.commit()
        return JSONResponse(
            content={"edit": "Successful",
                   #  'phone': myresult[0], 'password': myresult[1],
                   #  'name': myresult[2], 'email': myresult[3],
                   #  'birth_year': myresult[4], 'dialect': myresult[5],
                   #  'study_level': myresult[6], 'gender': myresult[7]
                    }, status_code=200
        )

@model_api.post("/admin_login")
def admin_login(data: admin_Auth) -> JSONResponse:
    query = "SELECT * FROM admin Where user_name = '"+data.user_name + "' LIMIT 1"
    mycursor = cursor_instance()

    mycursor.execute(query)

    myresult = mycursor.fetchall()
    if len(myresult) == 0:
        return JSONResponse(
            content={"login": "False"}, status_code=200
        )
    myresult = myresult[0]

    if myresult[1] == data.password:
        return JSONResponse(
            content={"login": "True",}, status_code=200
        )
    else:
        return JSONResponse(
            content={"login": "False"}, status_code=200
        )
