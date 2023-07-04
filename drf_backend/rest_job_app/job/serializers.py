from rest_framework import serializers
from .models import CandidateMaster, AcademicMaster,ExperienceMaster,LanguageKnownMaster,TechnologyKnownMaster,ReferenceMaster,PreferenceMaster, SelectMaster, OptionMaster, StateMaster, CityMaster

class SelectMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model= SelectMaster
        fields= '__all__'


class OptionMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionMaster
        fields ='__all__'


class StateMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model= StateMaster
        fields= '__all__'


class CityMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityMaster
        fields ='__all__'




class CandidateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CandidateMaster
        fields = '__all__'



class AcademicSerialiazer(serializers.ModelSerializer):
    # candidate = CandidateSerializer( read_only=True)
    class Meta:
        model = AcademicMaster
        fields= '__all__'


class ExperienceSerialiazer(serializers.ModelSerializer):
    # candidate = CandidateSerializer(read_only=True)    # it is user to display experince with candidate data as well
    class Meta:
        model = ExperienceMaster
        fields= '__all__'
        # depth=1      # it is also for the same purpose

class LanguageSerialiazer(serializers.ModelSerializer):
    # candidate = CandidateSerializer(read_only=True)
    class Meta:
        model = LanguageKnownMaster
        fields= '__all__'



class TechnologySerialiazer(serializers.ModelSerializer):
    # candidate = CandidateSerializer(read_only=True)
    class Meta:
        model = TechnologyKnownMaster
        fields= '__all__'
        # depth=1




class ReferenceSerialiazer(serializers.ModelSerializer):
    # candidate = CandidateSerializer(read_only=True)
    class Meta:
        model = ReferenceMaster
        fields= '__all__'
        # depth=1



class PreferenceSerialiazer(serializers.ModelSerializer):
    # candidate = CandidateSerializer(read_only=True)
    class Meta:
        model = PreferenceMaster
        fields= '__all__'
        # depth=1




class CandidateAllSerializer(serializers.ModelSerializer):
    academics= AcademicSerialiazer(many=True)
    experiences = ExperienceSerialiazer(many=True)
    languages = LanguageSerialiazer(many=True)
    technologies = TechnologySerialiazer(many=True)
    references = ReferenceSerialiazer(many=True)
    preferences = PreferenceSerialiazer(many=True)

    class Meta:
        model = CandidateMaster
        fields= '__all__'


class SelectAllSerializer(serializers.ModelSerializer):
    options = OptionMasterSerializer(many=True)
    class Meta:
        model  = SelectMaster
        fields = '__all__'        


class StateAllSerializer(serializers.ModelSerializer):
    cities = CityMasterSerializer(many=True)
    class Meta:
        model  = StateMaster
        fields = '__all__'                