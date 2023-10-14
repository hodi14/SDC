from typing import Optional,Union

from pydantic import BaseModel


class Auth(BaseModel):
    phone_number: Union[str, None] = None
    email: Union[str, None] = None
    password: str


class signup(BaseModel):
    phone_number: Union[str, None] = None
    email: Union[str, None] = None
    name: str
    gender: str
    birth_year: str
    password: str
    study: Union[str, None] = None
    dialect : Union[str, None] = None

class user_info(BaseModel):
    phone_number: Union[str, None] = None
    email: Union[str, None] = None

class userInfo_up(BaseModel):
    phone_number: Union[str, None] = None
    email: Union[str, None] = None
    name: Union[str, None] = None
    gender: Union[str, None] = None
    birth_year: Union[str, None] = None
    password: Union[str, None] = None
    study: Union[str, None] = None
    dialect : Union[str, None] = None

class upload(BaseModel):
    user_email: Union[str, None] = None
    user_phone:  Union[str, None] = None
    task_id: Union[int, None] = None
    task_text: Union[str, None] = None

class edit(BaseModel):
    phone_number: Union[str, None] = None
    email: Union[str, None] = None
    name: str
    gender: str
    birth_year: str
    password: str
    study: Union[str, None] = None
    dialect : Union[str, None] = None
