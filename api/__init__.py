from fastapi import APIRouter

from api.main import model_api

router = APIRouter()
router.include_router(router=model_api, prefix="/model")

__all__ = [router]
