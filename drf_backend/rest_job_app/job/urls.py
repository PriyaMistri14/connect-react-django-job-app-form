from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register('candidate', views.CandidateViewSet, basename="candidate")
router.register('academic', views.AcademicViewSet, basename="academic")
router.register('experience', views.ExperienceViewSet, basename="experience")
router.register('language', views.LanguageViewSet, basename="language")
router.register('technology', views.TechnologyViewSet, basename="technology")
router.register('reference', views.ReferenceViewSet, basename="reference")
router.register('preference', views.PreferenceViewSet, basename="preference")
router.register('candidate_all', views.CandidateAllViewSet, basename="candidate_all")



urlpatterns = [
    path('job/',include(router.urls)),
    # path('job/logout/', views.Logout.as_view(), name="logout")
]
