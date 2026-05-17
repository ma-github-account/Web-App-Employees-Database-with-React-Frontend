from django.urls import path
from base.views import employee_views as views

urlpatterns = [
    path('', views.getEmployees, name='employees'),
    path('create/', views.createEmployee, name='employee-create'),
    path('<str:pk>/', views.getEmployeeById, name='employee'),
    path('update/<str:pk>/', views.updateEmployee, name='employee-update'),
    path('delete/<str:pk>/', views.deleteEmployee, name='employee-delete'),
]
