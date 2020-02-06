from django.shortcuts import render, HttpResponseRedirect
from django.urls import reverse

from django.core.paginator import Paginator
from .models import CompanyBase, CompanyNameGlobal
from .models import XBRL_CompanyData as CompanyData

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

from rest_framework import serializers


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyData
        exclude = ['company_name', 'id']


class CompanyBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyBase
        exclude = ['id']


def index_view_page(request):
    page = request.GET.get('page')

    company_all = CompanyBase.objects.all().order_by('id')
    paginator = Paginator(company_all, 50)

    company_page = paginator.get_page(page)

    return render(request, 'stockmain/index.html', {'company_page': company_page})


def company_info_page(request, code):
    target_company = CompanyBase.objects.get(code=code)
    data = CompanyData.objects.filter(company_name=target_company,
                                      gaap=True).order_by('year_model', 'quarter_model').exclude(year_model="2015", quarter_model="12")

    sales_acc = 0
    oper_rev_acc = 0
    net_inc_acc = 0

    for dat in data:
        dat.sales //= 10**8
        dat.operating_revenue //= 10**8
        dat.net_income //= 10**8
        dat.asset //= 10**8
        dat.capital //= 10**8
        dat.liabilities //= 10**8

        if dat.quarter_model != 12:
            sales_acc += dat.sales
            oper_rev_acc += dat.operating_revenue
            net_inc_acc += dat.net_income
        else:
            dat.sales = dat.sales - sales_acc
            dat.operating_revenue = dat.operating_revenue - oper_rev_acc
            dat.net_income = dat.net_income - net_inc_acc

            sales_acc = 0
            oper_rev_acc = 0
            net_inc_acc = 0

    return render(request, 'stockmain/company_info.html', {'target_company': target_company,
                                                           'data' : data})


class ChartData(APIView):
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAdminUser]
    authentication_classes = []
    permission_classes = []

    def get(self, request, code):
        target_company = CompanyBase.objects.get(code=code)
        company_info = CompanyData.objects.filter(company_name__code=code, gaap=True).order_by('year_model', 'quarter_model')[1:]

        sales_acc = 0
        oper_rev_acc = 0
        net_inc_acc = 0

        for dat in company_info:
            dat.sales //= 100000000
            dat.operating_revenue //= 100000000
            dat.net_income //= 100000000
            dat.asset //= 100000000
            dat.capital //= 100000000
            dat.liabilities //= 100000000

            if dat.quarter_model != 12:
                sales_acc += dat.sales
                oper_rev_acc += dat.operating_revenue
                net_inc_acc += dat.net_income
            else:
                dat.sales = dat.sales - sales_acc
                dat.operating_revenue = dat.operating_revenue - oper_rev_acc
                dat.net_income = dat.net_income - net_inc_acc

                sales_acc = 0
                oper_rev_acc = 0
                net_inc_acc = 0


        base_serializer = CompanyBaseSerializer(target_company)
        info_serializer = CompanyInfoSerializer(company_info, many=True)

        data = {
            "target_company": base_serializer.data,
            "company_info": info_serializer.data,
        }
        return Response(data)


class CompanyBaseData(APIView):
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAdminUser]
    authentication_classes = []
    permission_classes = []

    def get(self, request, page=1):
        target_company = CompanyBase.objects.all()

        p = Paginator(target_company, 50)
        base_serializer = CompanyBaseSerializer(p.page(page), many=True)

        data = {
            "company_list": base_serializer.data,
        }
        return Response(data, headers={'content-type': 'application/json',
                                       'charset' : 'utf-8'})


def kr_company_ipo_search(request):
    import math
    import urllib3
    import xml.etree.ElementTree as ET

    DEBUG = True

    DATA_KEY = "3i7ykCg%2FMtunT66faaPy%2B9s4FkcjqjqVAyEa1p027ZT%2FZZakx6NMJUqkIdEQA%2BFeEQyjVuQpbKunFIDu9Txfog%3D%3D"

    http = urllib3.PoolManager()
    pageNo_init = '1'
    numOfRows_init = '2000'

    martTpcd = ('11', '12', '13', '14', '50')
    market= {"11": "KOSPI", "12": "KOSDAQ", "13": "K-OTC", "14": "KONEX", "50": "ETC"}

    # KOSPI, KOSDAQ, K-OTC, KONEX, 기타증권 코드.
    # 기타증권 제외 4개만 하도록 설정
    for x in range(0, 4):
        r = http.request("GET", "http://api.seibro.or.kr/openapi/service/StockSvc/getShotnByMartN1?type=json"
                         + "&serviceKey="
                         + DATA_KEY +
                         "&pageNo=" + pageNo_init +
                         "&numOfRows=" + numOfRows_init +
                         "&martTpcd=" + martTpcd[x])
        # 0	    NORMAL_CODE	                                        정상
        # 1	    APPLICATION_ERROR	                                어플리케이션 에러
        # 2	    DB_ERROR	                                        데이터베이스 에러
        # 3	    NODATA_ERROR	                                    데이터없음 에러
        # 4	    HTTP_ERROR	                                        HTTP 에러
        # 5	    SERVICETIMEOUT_ERROR	                            서비스 연결실패 에러
        # 10	INVALID_REQUEST_PARAMETER_ERROR	                    잘못된 요청 파라메터 에러
        # 11	NO_MANDATORY_REQUEST_PARAMETERS_ERROR	            필수요청 파라메터가 없음
        # 12	NO_OPENAPI_SERVICE_ERROR	                        해당 오픈API서비스가 없거나 폐기됨
        # 20	SERVICE_ACCESS_DENIED_ERROR	                        서비스 접근거부
        # 21	TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR	        일시적으로 사용할 수 없는 서비스 키
        # 22	LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR	서비스 요청제한횟수 초과에러
        # 30	SERVICE_KEY_IS_NOT_REGISTERED_ERROR	                등록되지 않은 서비스키
        # 31	DEADLINE_HAS_EXPIRED_ERROR	                        기한만료된 서비스키
        # 32	UNREGISTERED_IP_ERROR	                            등록되지 않은 IP
        # 33	UNSIGNED_CALL_ERROR	                                서명되지 않은 호출
        # 99	UNKNOWN_ERROR	                                    기타에러

        # data = testing
        data = r.data
        root = ET.fromstring(data)

        resultCode = root[0][0].text
        resultMsg = root[0][1].text

        # 응답코드가 00 일 경우 정상 작동 케이스
        if resultCode == "00":

            numOfRows = root[1][1].text
            pageNo = root[1][2].text
            totalCount = root[1][3].text

            # 전체 몇번 돌아야 하는지 계산
            total_page = math.ceil(int(totalCount) / int(numOfRows))

            # 계산한 페이지만큼 반복
            for page_index in range(0, total_page):
                page_index += 1
                r = http.request("GET", "http://api.seibro.or.kr/openapi/service/StockSvc/getShotnByMartN1?type=json"
                                 + "&serviceKey="
                                 + DATA_KEY +
                                 "&pageNo=" + str(page_index) +
                                 "&numOfRows=" + numOfRows +
                                 "&martTpcd=" + martTpcd[x])

                data = r.data
                root = ET.fromstring(data)

                # 응답코드가 00 일 경우 정상 작동 케이스 페이지별
                if resultCode == "00":
                    for company in root[1][0]:
                        if CompanyBase.objects.filter(code=company[1].text).exists():
                            C = CompanyBase.objects.get(code=company[1].text)
                            C.country = "Korea, Republic of"
                            C.status = 1
                            C.market = market[martTpcd[x]]

                            C.save()

                        else:
                            CompanyBase.objects.create(code=company[1].text,
                                                       company_name=company[0].text,
                                                       market=market[martTpcd[x]],
                                                       country="Korea, Republic of",
                                                       status=1)
                # 응답코드가 00 이 아닐경우 분기하는 케이스 페이지별
                else:
                    print(resultCode, "  ", resultMsg)
            # 응답코드가 00 이 아닐경우 분기하는 케이스
        else:
            print("ResultCode_Error" + resultCode + "  " + resultMsg)
    return HttpResponseRedirect(reverse('index'))


def kr_company_filing_parse_total(request):
    # 기존 VBA 기반 파싱 작업 옮기기
    import math
    import json
    import urllib3
    import time
    import re
    import xml.etree.ElementTree as ET
    from bs4 import BeautifulSoup as bs
    from django.utils import timezone

    def parse_automation(data):
        if data.find('p') != -1 and data.find('p') is not None and data.find('p').string is not None:
            if data.find('p').string.find('%') == -1:
                temp = data.find('p').string\
                    .replace(',', '')\
                    .replace('(', '')\
                    .replace(')', '')\
                    .isnumeric()
                if temp is False:
                    return 33333
                else:
                    return int(data.find('p').string
                                .replace(',', '')
                                .replace('(', '-')
                                .replace(')', ''))
            else:
                # % 가 안에 있는경우
                return 88888
        else:
            # p 태그를 못찾은경우 혹은 내용이 없는경우
            return 77777

    def split_function_2010after(data, parse_word):
        if data.lower().find('table') == -1:
            try:
                dcmNo = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[3]
                eleId = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[5]
                offset = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[7]
                length = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[9]
                dtd = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[11]

                report = http.request("GET", "http://dart.fss.or.kr/report/viewer.do?"
                                             "rcpNo=" + json_decoded["list"][count]['rcp_no']
                                      + "&dcmNo=" + dcmNo
                                      + "&eleId=" + eleId
                                      + "&offset=" + offset
                                      + "&length=" + length
                                      + "&dtd=" + dtd
                                      + "&displayimage=hide")

                report = report.data.decode(encoding="utf-8", errors='ignore')

                ifrs_bool = False
                gaap_bool = True

                return report, ifrs_bool, gaap_bool
            except:
                ifrs_bool = False
                gaap_bool = False
                report = ''
                return report, ifrs_bool, gaap_bool
        else:
            dcmNo = data.replace(' ', '').split(parse_word)[1].split('\'')[3]
            eleId = data.replace(' ', '').split(parse_word)[1].split('\'')[5]
            offset = data.replace(' ', '').split(parse_word)[1].split('\'')[7]
            length = data.replace(' ', '').split(parse_word)[1].split('\'')[9]
            dtd = data.replace(' ', '').split(parse_word)[1].split('\'')[11]

            report = http.request("GET", "http://dart.fss.or.kr/report/viewer.do?"
                                         "rcpNo=" + json_decoded["list"][count]['rcp_no']
                                  + "&dcmNo=" + dcmNo
                                  + "&eleId=" + eleId
                                  + "&offset=" + offset
                                  + "&length=" + length
                                  + "&dtd=" + dtd
                                  + "&displayimage=hide")

            report = report.data.decode(encoding="utf-8", errors='ignore')

            ifrs_bool = True
            gaap_bool = False

            return report, ifrs_bool, gaap_bool

    def split_function_2010before(data, parse_word):
        dcmNo = data.replace(' ', '').split(parse_word)[1].split('\'')[3]
        eleId = data.replace(' ', '').split(parse_word)[1].split('\'')[5]
        offset = data.replace(' ', '').split(parse_word)[1].split('\'')[7]
        length = data.replace(' ', '').split(parse_word)[1].split('\'')[9]
        dtd = data.replace(' ', '').split(parse_word)[1].split('\'')[11]

        report = http.request("GET", "http://dart.fss.or.kr/report/viewer.do?"
                                     "rcpNo=" + json_decoded["list"][count]['rcp_no']
                              + "&dcmNo=" + dcmNo
                              + "&eleId=" + eleId
                              + "&offset=" + offset
                              + "&length=" + length
                              + "&dtd=" + dtd
                              + "&displayimage=hide")

        report = report.data.decode(encoding="utf-8", errors='ignore')

        ifrs_bool = False
        gaap_bool = True

        return report, ifrs_bool, gaap_bool

    def trimming_function(data):
        data_temp = list(data)
        length = len(data_temp)
        in_tag = False
        offset = 0
        for index in range(length):
            if data_temp[index-offset] == '<':
                in_tag = True
            elif data_temp[index-offset] == '>':
                in_tag = False
            else:
                if in_tag:
                    pass
                else:
                    if data_temp[index-offset] == " ":
                        data_temp.pop(index-offset)
                        offset += 1
        s = ""
        s = s.join(data_temp)
        return s

    DATA_KEY = "8c7488f658a5ea8131ad2dd4b0bde6f4cb110de1"
    codehandler = "005930"                # 법인코드
    startdate = "20110501"          # 어느시점의 보고서부터 파싱할지
    asc_desc = "desc"                # 날짜순으로 오름순/내림순 설정

    http = urllib3.PoolManager()

    kr_company_total = CompanyBase.objects.filter(country='Korea, Republic of')

    for kr_company in kr_company_total[0:1]:
        # time.sleep(5)

        r = http.request("GET", "http://dart.fss.or.kr/api/search.json?auth=" + DATA_KEY +
                                "&crp_cd=" + kr_company.code +
                                "&start_dt=" + startdate +
                                "&bsn_tp=A001&bsn_tp=A002&bsn_tp=A003"   # A001 - A003  사업/반기/분기 보고서만 파싱
                                "&sort=date"
                                "&series=" + asc_desc +
                                "&page_set=100")

        print(r.data.decode("utf-8"))

        # DART API RESPONSE ERROR CODES
        # 000       정상
        # 010       등록되지 않은 키입니다.
        # 011       사용할 수 없는 키입니다. 오픈API에 등록되었으나, 일시적으로 사용 중지된
        #           키를 통하여 검색하는 경우 발생합니다.

        # 020       요청 제한을 초과하였습니다. 일반적으로는 10,000건 이상의 요청에
        #           대하여 이 에러 메시지가 발생되나, 요청 제한이 다르게 설정된 경우에는 이에 준하여 발생됩니다.

        # 100       필드의 부적절한 값입니다. 필드 설명에 없는 값을 사용한 경우에 발생하는 메시지입니다.
        # 800       원활한 공시서비스를 위하여 오픈API 서비스가 중지 중입니다.
        # 900       정의되지 않은 오류가 발생하였습니다.

        json_decoded = json.loads(r.data)

        # print(json_decoded)

        exception = ("[기재정정]", "[첨부정정]", "[첨부추가]",
                     "[변경등록]", "[연장결정]", "[발행조건확정]")

        total_count = json_decoded["total_count"]
        total_page = json_decoded["total_page"]

        DATALIST = {"재무상태표": ("자산총계", "자본총계", "부채총계"),
                    "손익계산서_1": ("매출액", "매출", "수익"),
                    "손익계산서_2": ("영업이익", "영업손실", "영업수익", "영업손익"),
                    "손익계산서_3": ("당기순이익", "반기순이익", "분기순이익", "반기순손실", "당기순손실",
                                "총포괄손익", "(당기)순이익", "계속영업이익"),
                    }

        if total_count > 0:
            for page in range(0,total_page):

                for count in range(0,total_count - 100*page):

                    ###############################################
                    # 여기에 기존 연/분기 자료 있으면 건너뛰는 프로세스 넣을것
                    ###############################################

                    year = int(json_decoded["list"][count]['rpt_nm'].split('(')[1].split('.')[0])
                    month = int(json_decoded["list"][count]['rpt_nm'].split('(')[1].split('.')[1].split(')')[0])

                    if month < 4:
                        quarter_prefetch = 3
                    elif month < 7:
                        quarter_prefetch = 6
                    elif month < 10:
                        quarter_prefetch = 9
                    elif month < 13:
                        quarter_prefetch = 12

                    if CompanyData.objects.filter(year_model=year,
                                                  quarter_model=quarter_prefetch,
                                                  company_name=kr_company).count() > 0:
                        pass
                    else:
                        # 일반 보고서인지 확인하는 작업
                        check = 0
                        for exep in range(0,6):
                            temp = json_decoded["list"][count]['rpt_nm'].find(exception[exep])
                            if temp != -1:
                                check += 1

                        # if check > 0:
                        #     print("일반 보고서가 아닙니다. 세부제목을 확인하세요")
                        #     print(json_decoded["list"][count]['rpt_nm'])
                        #
                        #     ###########################################################
                        #     # 정정 보고서일때 기존 일반 보고서를 지우든지 수정하든지 하는 작업 넣을것
                        #     ###########################################################
                        # else:

                        # 세부문서 진입
                        report = http.request("GET",
                                              "http://dart.fss.or.kr/dsaf001/main.do?rcpNo="
                                              + json_decoded["list"][count]['rcp_no'])

                        # crp_cls :: 법인구분: Y(유가), K(코스닥), N(코넥스), E(기타)
                        market_code = json_decoded["list"][count]['crp_cls']

                        # print(report.data.decode("utf-8"))

                        ####################################################################
                        # 1. 세부문서 진입    2. 세부문서 중 첨부 및 정정 등 제외한 주 보고서 진입
                        # 3. javascript 내부에 '재무제표' 단어가 있는지 확인
                        # 3-1. 있다면 가장 위의 재무제표 진입하고, 내부에 table 태그가 없다면
                        #       그 다음다음 목차에 접근. - 또 없다면 continue
                        # 3-2. 없다면 '재무에관한사항' 단어가 있는지 확인
                        #       있다면 목차에 접근. - 내부가 비어있다면 continue
                        ####################################################################

                        findIFRS = report.data.decode(encoding="utf-8", errors='ignore')

                        pre_soup = bs(findIFRS, 'html.parser')

                        # print(pre_soup.find('script', type="text/javascript").content)


                        # if script_boolean is not True:
                        #     report = split_function(findIFRS, '재무에관한사항')
                        #     ifrs_bool = False
                        #     gaap_bool = True
                        if pre_soup.find('option', title='사업보고서') is not None:
                            report = http.request("GET",
                                                  "http://dart.fss.or.kr/dsaf001/main.do?rcpNo="
                                                  + pre_soup.find('option', title='사업보고서')['value'].split('=')[1])
                        elif pre_soup.find('option', title='분기보고서') is not None:
                            report = http.request("GET",
                                                  "http://dart.fss.or.kr/dsaf001/main.do?rcpNo="
                                                  + pre_soup.find('option', title='분기보고서')['value'].split('=')[1])
                        elif pre_soup.find('option', title='반기보고서') is not None:
                            report = http.request("GET",
                                                  "http://dart.fss.or.kr/dsaf001/main.do?rcpNo="
                                                  + pre_soup.find('option', title='반기보고서')['value'].split('=')[1])
                        else:
                            continue

                        report = trimming_function(report.data.decode(encoding="utf-8", errors='ignore'))

                        pre_soup = bs(report, 'html.parser')

                        scripts = pre_soup.find_all('script')

                        script_boolean = False

                        for script in scripts:
                            if script.text.find('재무제표') != -1:
                                script_boolean = True

                        # print(dcmNo, eleId, offset, length, dtd)

                        if script_boolean is True:
                            report, ifrs_bool, gaap_bool = split_function_2010after(report, '재무제표')
                            if ifrs_bool is False and gaap_bool is False:
                                continue
                        else:
                            report, ifrs_bool, gaap_bool = split_function_2010before(report, '재무에관한사항')
                            if ifrs_bool is False and gaap_bool is False:
                                continue

                        # print(report)

                        report = trimming_function(report)

                        ifIFRS_in = False
                        if findIFRS.find("연결") != -1:
                            ifIFRS_in = True

                        QuarterCheck = True

                        if json_decoded["list"][count]['rpt_nm'].find("사업보고서"):
                            QuarterCheck = False

                        soup = bs(report, 'html.parser')

                        sales, operating_revenue, net_income, asset_, capital, liabilities = 0,0,0,0,0,0

                        # 재무상태표 자산총계 , 자본총계, 부채총계 파싱
                        for index, data in enumerate(DATALIST['재무상태표']):
                            assets = soup.find('p', text=re.compile(data))
                            if assets is None:
                                pass
                            else:
                                parent = assets.parent
                                td_siblings = parent.find_next_siblings("td")

                                # 0번째 순서의 p 찾고, string 내부의 ',' 제거 후 int 형변환
                                if len(td_siblings) > 0:
                                    if index == 0:
                                        asset_ = parse_automation(td_siblings[0])
                                    elif index == 1:
                                        capital = parse_automation(td_siblings[0])
                                    elif index == 2:
                                        liabilities = parse_automation(td_siblings[0])

                        # 손익계산서 매출 파싱
                        counted = False
                        for index, data in enumerate(DATALIST['손익계산서_1']):
                            if counted:
                                break
                            assets = soup.find('p', text=re.compile(data))
                            if assets is None:
                                pass
                            else:
                                parent = assets.parent
                                td_siblings = parent.find_next_siblings("td")

                                # 0번째 순서의 p 찾고, string 내부의 ',' 제거 후 int 형변환
                                if len(td_siblings) > 0:
                                    sales = parse_automation(td_siblings[0])
                                    counted = True
                                else:
                                    pass

                        # 손익계산서 영업이익 파싱
                        counted = False
                        for index, data in enumerate(DATALIST['손익계산서_2']):
                            if counted:
                                break
                            assets = soup.find('p', text=re.compile(data))
                            if assets is None:
                                pass
                            else:
                                parent = assets.parent
                                td_siblings = parent.find_next_siblings("td")

                                # 0번째 순서의 p 찾고, string 내부의 ',' 제거 후 int 형변환
                                if len(td_siblings) > 0:
                                    operating_revenue = parse_automation(td_siblings[0])
                                    counted = True
                                else:
                                    pass

                        # 손익계산서 순이익 파싱
                        counted = False
                        for index, data in enumerate(DATALIST['손익계산서_3']):
                            if counted:
                                break
                            assets = soup.find('p', text=re.compile(data))
                            if assets is None:
                                pass
                            else:
                                parent = assets.parent
                                td_siblings = parent.find_next_siblings("td")

                                # 0번째 순서의 p 찾고, string 내부의 ',' 제거 후 int 형변환
                                if len(td_siblings) > 0:
                                    net_income = parse_automation(td_siblings[0])
                                    counted = True
                                else:
                                    pass

                        # for child in td_siblings:
                        #     inner = child.find('p')
                        #     print(inner.string)

                        print(json_decoded["list"][count]['rpt_nm'], year, month, count)

                        # 원 단위 확인
                        report = report.strip().replace(' ', '')

                        ratio = ''
                        ratio_found = False
                        ratio_unity = True
                        ratio_append = ""

                        ratio_count = report.count("단위:")
                        if ratio_count > 0:
                            ratio_found = True
                            ratio = ""
                            for ratio_index in range(1, ratio_count):
                                if ratio_index != 1:
                                    if ratio == report.split("단위:")[ratio_index][0:2]:
                                        pass
                                    else:
                                        ratio_unity = False
                                        ratio_append += report.split("단위:")[ratio_index][0:2]
                                else:
                                    ratio = report.split("단위:")[ratio_index][0:2]
                                    ratio_append += ratio
                        else:
                            ratio_found = False

                        # 회사별 분기정보 객체 instantiation
                        new = CompanyData()

                        # 회사별 분기정보 입력
                        new.year_model = year
                        new.quarter_model = quarter_prefetch

                        new.company_name = kr_company
                        new.asset = asset_
                        new.capital = capital
                        new.liabilities = liabilities

                        new.sales = sales
                        new.operating_revenue = operating_revenue
                        new.net_income = net_income

                        new.created_at = timezone.now()

                        new.quarter_check = QuarterCheck

                        new.ratio_unity = ratio_unity
                        new.ratio_count = ratio_count
                        new.ratio_found = ratio_found
                        new.ratio = ratio_append

                        new.market_code = market_code

                        new.ifrs = ifrs_bool
                        new.gaap = gaap_bool

                        new.save()

                        # tables = soup.find_all('table')

                        # print(tables)
                        #
                        # print(len(tables))
                        #
                        # time.sleep(1)
                        #
                        # for table in tables:
                        #     print(table)
                        #     IFRS_GAAP = table.find("tbody").find_all('p')
                        #     if len(IFRS_GAAP) > 0:
                        #         print(IFRS_GAAP)
                        #     else:
                        #         pass

        else:
            print("해당 회사의" + startdate + "이후의 사업/반기/분기 보고서가 없습니다.")

    return HttpResponseRedirect(reverse('index'))


def kr_company_filing_parse_inspection(request):
    import json
    import urllib3
    import re
    from bs4 import BeautifulSoup as bs
    from django.http import HttpResponse

    def parse_automation(data):
        if data.find('p') != -1 and data.find('p') is not None and data.find('p').string is not None:
            if data.find('p').string.find('%') == -1:
                temp = data.find('p').string\
                    .replace(',', '')\
                    .replace('(', '')\
                    .replace(')', '')\
                    .isnumeric()
                if temp is False:
                    return 33333
                else:
                    return int(data.find('p').string
                                .replace(',', '')
                                .replace('(', '-')
                                .replace(')', ''))
            else:
                # % 가 안에 있는경우
                return 88888
        else:
            # p 태그를 못찾은경우 혹은 내용이 없는경우
            return 77777

    def split_function_2010after(data, parse_word):
        if data.lower().find('table') == -1:
            try:
                dcmNo = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[3]
                eleId = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[5]
                offset = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[7]
                length = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[9]
                dtd = data.replace(' ', '').split(parse_word)[1 + 2].split('\'')[11]

                report = http.request("GET", "http://dart.fss.or.kr/report/viewer.do?"
                                             "rcpNo=" + json_decoded["list"][count]['rcp_no']
                                      + "&dcmNo=" + dcmNo
                                      + "&eleId=" + eleId
                                      + "&offset=" + offset
                                      + "&length=" + length
                                      + "&dtd=" + dtd
                                      + "&displayimage=hide")

                report = report.data.decode(encoding="utf-8", errors='ignore')

                ifrs_bool = False
                gaap_bool = True

                return report, ifrs_bool, gaap_bool
            except:
                ifrs_bool = False
                gaap_bool = False
                report = ''
                return report, ifrs_bool, gaap_bool
        else:
            dcmNo = data.replace(' ', '').split(parse_word)[1].split('\'')[3]
            eleId = data.replace(' ', '').split(parse_word)[1].split('\'')[5]
            offset = data.replace(' ', '').split(parse_word)[1].split('\'')[7]
            length = data.replace(' ', '').split(parse_word)[1].split('\'')[9]
            dtd = data.replace(' ', '').split(parse_word)[1].split('\'')[11]

            report = http.request("GET", "http://dart.fss.or.kr/report/viewer.do?"
                                         "rcpNo=" + json_decoded["list"][count]['rcp_no']
                                  + "&dcmNo=" + dcmNo
                                  + "&eleId=" + eleId
                                  + "&offset=" + offset
                                  + "&length=" + length
                                  + "&dtd=" + dtd
                                  + "&displayimage=hide")

            report = report.data.decode(encoding="utf-8", errors='ignore')

            ifrs_bool = True
            gaap_bool = False

            return report, ifrs_bool, gaap_bool

    def split_function_2010before(data, parse_word):
        dcmNo = data.replace(' ', '').split(parse_word)[1].split('\'')[3]
        eleId = data.replace(' ', '').split(parse_word)[1].split('\'')[5]
        offset = data.replace(' ', '').split(parse_word)[1].split('\'')[7]
        length = data.replace(' ', '').split(parse_word)[1].split('\'')[9]
        dtd = data.replace(' ', '').split(parse_word)[1].split('\'')[11]

        report = http.request("GET", "http://dart.fss.or.kr/report/viewer.do?"
                                     "rcpNo=" + json_decoded["list"][count]['rcp_no']
                              + "&dcmNo=" + dcmNo
                              + "&eleId=" + eleId
                              + "&offset=" + offset
                              + "&length=" + length
                              + "&dtd=" + dtd
                              + "&displayimage=hide")

        report = report.data.decode(encoding="utf-8", errors='ignore')

        ifrs_bool = False
        gaap_bool = True

        return report, ifrs_bool, gaap_bool

    def trimming_function(data):
        data_temp = list(data)
        length = len(data_temp)
        in_tag = False
        offset = 0
        for index in range(length):
            if data_temp[index-offset] == '<':
                in_tag = True
            elif data_temp[index-offset] == '>':
                in_tag = False
            else:
                if in_tag:
                    pass
                else:
                    if data_temp[index-offset] == " ":
                        data_temp.pop(index-offset)
                        offset += 1
        s = ""
        s = s.join(data_temp)
        return s

    DATA_KEY = "8c7488f658a5ea8131ad2dd4b0bde6f4cb110de1"
    startdate = "20110501"          # 어느시점의 보고서부터 파싱할지
    asc_desc = "desc"                # 날짜순으로 오름순/내림순 설정

    http = urllib3.PoolManager()

    kr_company_total = CompanyBase.objects.filter(country='Korea, Republic of')

    for kr_company in kr_company_total[0:]:
        # time.sleep(5)

        r = http.request("GET", "http://dart.fss.or.kr/api/search.json?auth=" + DATA_KEY +
                                "&crp_cd=" + kr_company.code +
                                "&start_dt=" + startdate +
                                "&bsn_tp=A001&bsn_tp=A002&bsn_tp=A003"   # A001 - A003  사업/반기/분기 보고서만 파싱
                                "&sort=date"
                                "&series=" + asc_desc +
                                "&page_set=100")

        print(r.data.decode("utf-8"))

        # DART API RESPONSE ERROR CODES
        # 000       정상
        # 010       등록되지 않은 키입니다.
        # 011       사용할 수 없는 키입니다. 오픈API에 등록되었으나, 일시적으로 사용 중지된
        #           키를 통하여 검색하는 경우 발생합니다.

        # 020       요청 제한을 초과하였습니다. 일반적으로는 10,000건 이상의 요청에
        #           대하여 이 에러 메시지가 발생되나, 요청 제한이 다르게 설정된 경우에는 이에 준하여 발생됩니다.

        # 100       필드의 부적절한 값입니다. 필드 설명에 없는 값을 사용한 경우에 발생하는 메시지입니다.
        # 800       원활한 공시서비스를 위하여 오픈API 서비스가 중지 중입니다.
        # 900       정의되지 않은 오류가 발생하였습니다.

        json_decoded = json.loads(r.data)

        # print(json_decoded)

        exception = ("[기재정정]", "[첨부정정]", "[첨부추가]",
                     "[변경등록]", "[연장결정]", "[발행조건확정]")

        total_count = json_decoded["total_count"]
        total_page = json_decoded["total_page"]

        DATALIST = {"재무상태표": ("자산총계", "자본총계", "부채총계"),
                    "손익계산서_1": ("매출액", "매출", "수익"),
                    "손익계산서_2": ("영업이익", "영업손실", "영업수익", "영업손익"),
                    "손익계산서_3": ("당기순이익", "반기순이익", "분기순이익", "반기순손실", "당기순손실",
                                "총포괄손익", "(당기)순이익", "계속영업이익"),
                    }

        if total_count > 0:
            for page in range(0,total_page):

                for count in range(0,total_count - 100*page):

                    ###############################################
                    # 여기에 기존 연/분기 자료 있으면 건너뛰는 프로세스 넣을것
                    ###############################################

                    year = int(json_decoded["list"][count]['rpt_nm'].split('(')[1].split('.')[0])
                    month = int(json_decoded["list"][count]['rpt_nm'].split('(')[1].split('.')[1].split(')')[0])

                    if month < 4:
                        quarter_prefetch = 3
                    elif month < 7:
                        quarter_prefetch = 6
                    elif month < 10:
                        quarter_prefetch = 9
                    elif month < 13:
                        quarter_prefetch = 12

                    # if CompanyData.objects.filter(year_model=year,
                    #                               quarter_model=quarter_prefetch,
                    #                               company_name=kr_company).count() > 0:
                    if CompanyData.objects.filter(year_model=year,
                                                  quarter_model=quarter_prefetch,
                                                  company_name=kr_company).count() > 0 \
                            and False:
                        pass
                    else:
                        # 일반 보고서인지 확인하는 작업
                        check = 0
                        for exep in range(0,6):
                            temp = json_decoded["list"][count]['rpt_nm'].find(exception[exep])
                            if temp != -1:
                                check += 1

                        # if check > 0:
                        #     print("일반 보고서가 아닙니다. 세부제목을 확인하세요")
                        #     print(json_decoded["list"][count]['rpt_nm'])
                        #
                        #     ###########################################################
                        #     # 정정 보고서일때 기존 일반 보고서를 지우든지 수정하든지 하는 작업 넣을것
                        #     ###########################################################
                        # else:

                        # 세부문서 진입
                        report = http.request("GET",
                                              "http://dart.fss.or.kr/dsaf001/main.do?rcpNo="
                                              + json_decoded["list"][count]['rcp_no'])

                        # crp_cls :: 법인구분: Y(유가), K(코스닥), N(코넥스), E(기타)
                        market_code = json_decoded["list"][count]['crp_cls']

                        # print(report.data.decode("utf-8"))

                        ####################################################################
                        # 1. 세부문서 진입    2. 세부문서 중 첨부 및 정정 등 제외한 주 보고서 진입
                        # 3. javascript 내부에 '재무제표' 단어가 있는지 확인
                        # 3-1. 있다면 가장 위의 재무제표 진입하고, 내부에 table 태그가 없다면
                        #       그 다음다음 목차에 접근. - 또 없다면 continue
                        # 3-2. 없다면 '재무에관한사항' 단어가 있는지 확인
                        #       있다면 목차에 접근. - 내부가 비어있다면 continue
                        ####################################################################

                        findIFRS = report.data.decode(encoding="utf-8", errors='ignore')

                        pre_soup = bs(findIFRS, 'html.parser')

                        # print(pre_soup.find('script', type="text/javascript").content)


                        # if script_boolean is not True:
                        #     report = split_function(findIFRS, '재무에관한사항')
                        #     ifrs_bool = False
                        #     gaap_bool = True
                        if pre_soup.find('option', title='사업보고서') is not None:
                            report = http.request("GET",
                                                  "http://dart.fss.or.kr/dsaf001/main.do?rcpNo="
                                                  + pre_soup.find('option', title='사업보고서')['value'].split('=')[1])
                        elif pre_soup.find('option', title='분기보고서') is not None:
                            report = http.request("GET",
                                                  "http://dart.fss.or.kr/dsaf001/main.do?rcpNo="
                                                  + pre_soup.find('option', title='분기보고서')['value'].split('=')[1])
                        elif pre_soup.find('option', title='반기보고서') is not None:
                            report = http.request("GET",
                                                  "http://dart.fss.or.kr/dsaf001/main.do?rcpNo="
                                                  + pre_soup.find('option', title='반기보고서')['value'].split('=')[1])
                        else:
                            continue

                        # tempor = report.data.decode(encoding="utf-8", errors='ignore')
                        # print(len(tempor))

                        report = trimming_function(report.data.decode(encoding="utf-8", errors='ignore'))

                        pre_soup = bs(report, 'html.parser')

                        scripts = pre_soup.find_all('script')

                        script_boolean = False

                        for script in scripts:
                            if script.text.find('재무제표') != -1:
                                script_boolean = True

                        # print(dcmNo, eleId, offset, length, dtd)

                        if script_boolean is True:
                            report, ifrs_bool, gaap_bool = split_function_2010after(report, '재무제표')
                            if ifrs_bool is False and gaap_bool is False:
                                continue
                        else:
                            report, ifrs_bool, gaap_bool = split_function_2010before(report, '재무에관한사항')
                            if ifrs_bool is False and gaap_bool is False:
                                continue

                        # print(report)
                        report = trimming_function(report)

                        ifIFRS_in = False
                        if findIFRS.find("연결") != -1:
                            ifIFRS_in = True

                        QuarterCheck = True

                        if json_decoded["list"][count]['rpt_nm'].find("사업보고서"):
                            QuarterCheck = False

                        soup = bs(report, 'html.parser')

                        sales, operating_revenue, net_income, asset_, capital, liabilities = 0,0,0,0,0,0

                        # 재무상태표 자산총계 , 자본총계, 부채총계 파싱
                        for index, data in enumerate(DATALIST['재무상태표']):
                            assets = soup.find('p', text=re.compile(data))
                            if assets is None:
                                pass
                            else:
                                parent = assets.parent
                                td_siblings = parent.find_next_siblings("td")

                                # 0번째 순서의 p 찾고, string 내부의 ',' 제거 후 int 형변환
                                if len(td_siblings) > 0:
                                    if index == 0:
                                        if td_siblings[0].p is not None:
                                            td_siblings[0].p.string.wrap(soup.new_tag("b", id='asset'))
                                        asset_ = parse_automation(td_siblings[0])
                                    elif index == 1:
                                        if td_siblings[0].p is not None:
                                            td_siblings[0].p.string.wrap(soup.new_tag("b", id='capital'))
                                        capital = parse_automation(td_siblings[0])
                                    elif index == 2:
                                        if td_siblings[0].p is not None:
                                            td_siblings[0].p.string.wrap(soup.new_tag("b", id='liabilities'))
                                        liabilities = parse_automation(td_siblings[0])

                        # 손익계산서 매출 파싱
                        counted = False
                        for index, data in enumerate(DATALIST['손익계산서_1']):
                            if counted:
                                break
                            assets = soup.find('p', text=re.compile(data))
                            if assets is None:
                                pass
                            else:
                                parent = assets.parent
                                td_siblings = parent.find_next_siblings("td")

                                # 0번째 순서의 p 찾고, string 내부의 ',' 제거 후 int 형변환
                                if len(td_siblings) > 0:
                                    if td_siblings[0].p is not None:
                                        td_siblings[0].p.string.wrap(soup.new_tag("b", id='sales'))
                                    sales = parse_automation(td_siblings[0])
                                    counted = True
                                else:
                                    pass

                        # 손익계산서 영업이익 파싱
                        counted = False
                        for index, data in enumerate(DATALIST['손익계산서_2']):
                            if counted:
                                break
                            assets = soup.find('p', text=re.compile(data))
                            if assets is None:
                                pass
                            else:
                                parent = assets.parent
                                td_siblings = parent.find_next_siblings("td")

                                # 0번째 순서의 p 찾고, string 내부의 ',' 제거 후 int 형변환
                                if len(td_siblings) > 0:
                                    if td_siblings[0].p is not None:
                                        td_siblings[0].p.string.wrap(soup.new_tag("b", id='operating_revenue'))
                                    operating_revenue = parse_automation(td_siblings[0])
                                    counted = True
                                else:
                                    pass

                        # 손익계산서 순이익 파싱
                        counted = False
                        for index, data in enumerate(DATALIST['손익계산서_3']):
                            if counted:
                                break
                            assets = soup.find('p', text=re.compile(data))
                            if assets is None:
                                pass
                            else:
                                parent = assets.parent
                                td_siblings = parent.find_next_siblings("td")

                                # 0번째 순서의 p 찾고, string 내부의 ',' 제거 후 int 형변환
                                if len(td_siblings) > 0:
                                    if td_siblings[0].p is not None:
                                        td_siblings[0].p.string.wrap(soup.new_tag("b", id='net_income'))
                                    net_income = parse_automation(td_siblings[0])
                                    counted = True
                                else:
                                    pass

                        print(json_decoded["list"][count]['rpt_nm'], year, month, count)

                        # 원 단위 확인
                        # report = report

                        ratio = ''
                        ratio_found = False
                        ratio_unity = True
                        ratio_append = ""

                        ratio_count = report.count("단위:")
                        if ratio_count > 0:
                            ratio_found = True
                            ratio = ""
                            for ratio_index in range(1, ratio_count):
                                if ratio_index != 1:
                                    if ratio == report.split("단위:")[ratio_index][0:2]:
                                        pass
                                    else:
                                        ratio_unity = False
                                        ratio_append += report.split("단위:")[ratio_index][0:2]
                                else:
                                    ratio = report.split("단위:")[ratio_index][0:2]
                                    ratio_append += ratio
                        else:
                            ratio_found = False

                        ratios = soup.find_all('p', text=re.compile("단위:"))

                        for i in ratios:
                            i.string.wrap(soup.new_tag("b", id="won"))

                        return render(request, 'stockmain/inspection/test.html', {'report': soup.prettify()})


        else:
            print("해당 회사의" + startdate + "이후의 사업/반기/분기 보고서가 없습니다.")

    return HttpResponseRedirect(reverse('index'))


