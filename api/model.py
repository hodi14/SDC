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
    dailect : Union[str, None] = None

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
    dailect : Union[str, None] = None