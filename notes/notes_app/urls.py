from django.urls import path
from .views import note_list, note_update_delete








urlpatterns=[
    path("notess/",note_list,name="note_list"),
    path("notess/<int:pk>/",note_update_delete,name="update_delete")
]
