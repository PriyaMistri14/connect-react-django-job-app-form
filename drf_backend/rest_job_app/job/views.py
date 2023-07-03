from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import CandidateAllSerializer,CandidateSerializer,AcademicSerialiazer,ExperienceSerialiazer,LanguageSerialiazer,TechnologySerialiazer,ReferenceSerialiazer,PreferenceSerialiazer

from .models import CandidateMaster,AcademicMaster,ExperienceMaster,LanguageKnownMaster,TechnologyKnownMaster,ReferenceMaster,PreferenceMaster


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response



from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth import get_user_model
User = get_user_model()



class CandidateAllViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    # permission_classes = (IsAuthenticated,)
    queryset = CandidateMaster.objects.all()
    serializer_class = CandidateAllSerializer






class CandidateViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    # authentication_classes = (JWTAuthentication,)

    # permission_classes = (IsAuthenticated,) this shuold be commented to only authenticate using jwt from front end
    # permission_classes = (IsAdminUser,)
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
# class Logout(APIView):
#     def post(self, request):
#         # try:
#             refresh_token = request.data('refresh_token')
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response("Log out successfully!!")
#         # except Exception as e:
#             # return Response("Error occurs while log out!!")    

