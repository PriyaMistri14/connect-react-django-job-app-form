from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from django.urls import path,include

from .views import RegisterAPIView

urlpatterns = [
    path('login/',TokenObtainPairView.as_view(),name="login"),
    path('refresh_token/',TokenRefreshView.as_view(),name="refresh_token"),
    path('register/',RegisterAPIView.as_view(),name="register"),
    ]