from django.shortcuts import render, HttpResponseRedirect, HttpResponse
from django.urls import reverse

from django.core.paginator import Paginator
from .models import CompanyBase, CompanyNameGlobal, CompanyData, XBRL_CompanyData

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

from rest_framework import serializers

def control_panel(request):
    page = request.GET.get('page')

    company_all = CompanyBase.objects.all().order_by('id')
    paginator = Paginator(company_all, 50)

    company_page = paginator.get_page(page)

    return render(request, 'stockmain/index.html', {'company_page': company_page})


def XBRL_Parse_comparison(request):

    def compare(a,b):
        # 입력 두 값의 자릿수 확인
        len_a = len(str(a[0].asset))
        len_b = len(str(b[0].asset))

        if a[0].asset is None or b[0].asset is None:
            return False

        # 임시 저장
        temp_a = a[0].asset
        temp_b = b[0].asset

        # 같을 경우 그대로 비교하고 아닐 경우 서로의 자릿수 보상
        if len_a == len_b:
            pass
        elif len_a > len_b:
            temp_b = b[0].asset*(10**(len_a-len_b))
        else:
            temp_a = a[0].asset*(10**(len_b-len_b))

        # a-b * 1000 의 절대값이 a 보다 작아야 함. == 정확도 0.1% 이내
        if abs((temp_a - temp_b)*100) < temp_a:
            return True
        else:
            return False


    # total_XBRL_count = []
    # total_parse_count = []
    #
    # # 앞이 XBRL, 뒤가 parse 데이터
    # ifrs_ifrs_equal = []
    # ifrs_gaap_equal = []
    # gaap_gaap_equal = []
    # gaap_ifrs_equal = []
    #
    # XBRL_exist_parse_exist_gaap = []
    # XBRL_exist_parse_Nexist_gaap = []
    # XBRL_Nexist_parse_exist_gaap = []
    # XBRL_Nexist_parse_Nexist_gaap = []
    #
    # XBRL_exist_parse_exist_ifrs = []
    # XBRL_exist_parse_Nexist_ifrs = []
    # XBRL_Nexist_parse_exist_ifrs = []
    # XBRL_Nexist_parse_Nexist_ifrs = []

    total_XBRL_count = 0
    total_parse_count = 0

    # 앞이 XBRL, 뒤가 parse 데이터
    ifrs_ifrs_equal = 0
    ifrs_gaap_equal = 0
    gaap_gaap_equal = 0
    gaap_ifrs_equal = 0

    XBRL_exist_parse_exist_gaap = 0
    XBRL_exist_parse_Nexist_gaap = 0
    XBRL_Nexist_parse_exist_gaap = 0
    XBRL_Nexist_parse_Nexist_gaap = 0

    XBRL_exist_parse_exist_ifrs = 0
    XBRL_exist_parse_Nexist_ifrs = 0
    XBRL_Nexist_parse_exist_ifrs = 0
    XBRL_Nexist_parse_Nexist_ifrs = 0


    company_total = CompanyBase.objects.all()


    for year in range(2016, 2020):

        for quarter in range(3,13,3):
            print(year, quarter)
            ifrs_ifrs_equal = 0
            ifrs_gaap_equal = 0
            gaap_gaap_equal = 0
            gaap_ifrs_equal = 0

            for company in company_total:

                ifrs_XBRL = XBRL_CompanyData.objects.filter(year_model=year,
                                                            quarter_model=quarter,
                                                            company_name=company,
                                                            ifrs=True)
                ifrs_parsed = CompanyData.objects.filter(year_model=year,
                                                         quarter_model=quarter,
                                                         company_name=company,
                                                         ifrs=True)

                ibool_XBRL = ifrs_XBRL.exists()
                ibool_parsed = ifrs_parsed.exists()

                gaap_XBRL = XBRL_CompanyData.objects.filter(year_model=year,
                                                            quarter_model=quarter,
                                                            company_name=company,
                                                            gaap=True)
                gaap_parsed = CompanyData.objects.filter(year_model=year,
                                                         quarter_model=quarter,
                                                         company_name=company,
                                                         gaap=True)

                gbool_XBRL = gaap_XBRL.exists()
                gbool_parsed = gaap_parsed.exists()

                if ibool_parsed and ibool_XBRL:
                    XBRL_exist_parse_exist_ifrs += 1
                    if compare(ifrs_XBRL, ifrs_parsed):
                        ifrs_ifrs_equal += 1

                if gbool_parsed and gbool_XBRL:
                    XBRL_exist_parse_exist_gaap += 1
                    if compare(gaap_XBRL, gaap_parsed):
                        gaap_gaap_equal += 1

                if gbool_parsed and ibool_XBRL:
                    if compare(ifrs_XBRL, gaap_parsed):
                        ifrs_gaap_equal += 1

                if ibool_parsed and gbool_XBRL:
                    if compare(gaap_XBRL, ifrs_parsed):
                        gaap_ifrs_equal += 1

            print(ifrs_ifrs_equal, ifrs_gaap_equal, gaap_gaap_equal, gaap_ifrs_equal)

    return HttpResponse("XBRL_Parse_comparison")


