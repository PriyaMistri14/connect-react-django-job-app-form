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
router.register('select', views.SelectViewSet, basename="select")
router.register('option', views.OptionViewSet, basename="option")
router.register('select_all', views.SelectAllViewSet, basename="select_all")
router.register('state', views.StateViewSet, basename="state")
router.register('city', views.CityViewSet, basename="city")
router.register('state_all', views.StateAllViewSet, basename="state_all")



urlpatterns = [
    path('job/',include(router.urls)),
    path('job/logout/', views.Logout.as_view(), name="logout"),
    path('job/getCities/', views.GetCities.as_view(), name="getCities"),
    path('job/pagination/', views.Pagination, name="pagination")
]
