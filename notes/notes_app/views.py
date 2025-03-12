from django.shortcuts import render
from rest_framework.decorators import api_view 
from .models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET','POST'])
def note_list(request):
    if request.method=="GET":
        notess=Note.objects.all()
        serializer=NoteSerializer(notess,many=True)
        return Response(serializer.data)
    elif request.method=="POST":
        serializer=NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["PUT","DELETE"])
def note_update_delete(request,pk):
    note=Note.objects.filter(pk=pk).first()
    if not note:
        return Response({"error":"not found"},status=status.HTTP_404_NOT_FOUND)
    if request.method=="PUT":
        serializer=NoteSerializer(note,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method=="DELETE":
        note.delete()
        return Response({"message":"note deleted successfully"},status=status.HTTP_204_NO_CONTENT)