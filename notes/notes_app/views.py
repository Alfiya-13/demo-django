from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from .models import Note
from .serializers import NoteSerializer,UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def note_list(request):
    if request.method=="GET":
        notess=Note.objects.filter(user=request.user)
        serializer=NoteSerializer(notess,many=True)
        return Response(serializer.data)
    elif request.method=="POST":
        data=request.data.copy()
        data["user"]=request.user.id
        serializer=NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["PUT","DELETE"])
@permission_classes([IsAuthenticated])
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
    

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)




@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    username=request.data.get("username")
    password=request.data.get("password")
    user=authenticate(username=username,password=password)
    if user:
        refresh=RefreshToken.for_user(user)
        return Response({"refresh":str(refresh),"access":str(refresh.access_token)})
    return Response({"error":"invalid credentials"},status=status.HTTP_401_UNAUTHORIZED)
    