from django.urls import path

from . import views

#Display (app) url

urlpatterns = [
    path('', views.landingPage),
    path('search/', views.artistPageSearch),
]
