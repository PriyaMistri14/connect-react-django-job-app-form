from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import CandidateAllSerializer,CandidateSerializer,AcademicSerialiazer,ExperienceSerialiazer,LanguageSerialiazer,TechnologySerialiazer,ReferenceSerialiazer,PreferenceSerialiazer, SelectMasterSerializer, OptionMasterSerializer, SelectAllSerializer, StateAllSerializer, StateMasterSerializer, CityMasterSerializer

from .models import CandidateMaster,AcademicMaster,ExperienceMaster,LanguageKnownMaster,TechnologyKnownMaster,ReferenceMaster,PreferenceMaster,SelectMaster, OptionMaster, StateMaster, CityMaster


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response


from django.core.serializers import json # for getcities



from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth import get_user_model
User = get_user_model()


class SelectViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = SelectMaster.objects.all()
    serializer_class = SelectMasterSerializer



class OptionViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = OptionMaster.objects.all()
    serializer_class = OptionMasterSerializer
    
class SelectAllViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset =  SelectMaster.objects.all()
    serializer_class = SelectAllSerializer



class StateViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = StateMaster.objects.all()
    serializer_class = StateMasterSerializer



class CityViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = CityMaster.objects.all()
    serializer_class = CityMasterSerializer
    
class StateAllViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset =  StateMaster.objects.all()
    serializer_class = StateAllSerializer




class CandidateAllViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    # permission_classes = (IsAuthenticated,)
    queryset = CandidateMaster.objects.all()
    serializer_class = CandidateAllSerializer






class CandidateViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    # authentication_classes = (JWTAuthentication,)

    # permission_classes = (IsAuthenticated,) #this shuold be commented to only authenticate using jwt from front end
    # permission_classes = (IsAdminUser,)
    print("called.................")
    queryset = CandidateMaster.objects.all()
    serializer_class = CandidateSerializer


class AcademicViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = AcademicMaster.objects.all()
    serializer_class = AcademicSerialiazer



class ExperienceViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = ExperienceMaster.objects.all()
    serializer_class = ExperienceSerialiazer




class LanguageViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = LanguageKnownMaster.objects.all()
    serializer_class = LanguageSerialiazer




class TechnologyViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = TechnologyKnownMaster.objects.all()
    serializer_class = TechnologySerialiazer





class ReferenceViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = ReferenceMaster.objects.all()
    serializer_class = ReferenceSerialiazer



class PreferenceViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = PreferenceMaster.objects.all()
    serializer_class = PreferenceSerialiazer


# uncommet this
class Logout(APIView):
    def post(self, request):
        
        print("request///////////////////////////", request.data['refresh_token'])

        try:
            refresh_token =  request.data['refresh_token']
            
            token = RefreshToken(refresh_token)
            print("token.../////\\\\\\", token.blacklist())
            token.blacklist()
            print("token.../////\\\\\\", token)
            return Response({"logout":"Log out successfully!!"})
        except Exception as e:
            return Response({"error":"Error occurs while log out!!"})    


class GetCities(APIView):
    def post(self, request):
        
        print("In get cities : ", request.data['state'])
        try:
            state = request.data['state']
            state_obj = StateMaster.objects.filter(name=state).first()
            print("state id/////", state_obj)
            
            state_id = state_obj.id
            print("state id/////", state_id)
            cities = CityMaster.objects.filter(state=state_obj).values()
            print("Citiesssssssssss: ", cities)
            # json_serializer = json.Serializer()
            # json_serialized = json_serializer.serialize(cities)
            # data = serializers.serialize('json',cities)
            # print("dataaa/////////////////////////", data)


            return Response({"fetched_cities":cities})

        except Exception as e:
            return Response({"error":"Error occurs while fetching cities!!"}) 


