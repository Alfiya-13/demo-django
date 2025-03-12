from django.urls import path
from .views import todo_list, todo_update_delete,register,login








urlpatterns=[
    path("todos/",todo_list,name="todo_list"),
    path("todos/<int:pk>/",todo_update_delete,name="update_delete"),
    path("register/",register,name="register"),
    path("login/",login,name="login")
    
]
