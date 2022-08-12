from django.urls import path 
from . import views

urlpatterns = [
    path('artist/<slug:artistId>', views.getData),
    path('test/', views.testing),
]