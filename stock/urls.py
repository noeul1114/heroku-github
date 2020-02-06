from django.urls import path

from . import views
from . import view_xbrl, view_control

urlpatterns = [
    path('', views.index_view_page, name="index"),
    path('iposearch', views.kr_company_ipo_search, name="iposearch"),
    path('filing_parse', views.kr_company_filing_parse_total, name="filing_parse"),
    path('inspection', views.kr_company_filing_parse_inspection, name="filing_parse_inspection"),
    path('info/<str:code>', views.company_info_page, name="company_info_page"),
    path('info/chart/<str:code>', views.ChartData.as_view()),

    path('companys/<int:page>', views.CompanyBaseData.as_view()),

    path('xbrl', view_xbrl.index_view_page_xbrl, name="xbrl"),
    path('control', view_xbrl.index_view_page_xbrl, name="xbrl_control"),
    path('xbrl_compare', view_control.XBRL_Parse_comparison, name="xbrl_compare"),

    path('common_word_inspect', view_xbrl.common_word_inspect, name="common_word_inspect"),
    path('common_word_inspect_reverse', view_xbrl.common_word_inspect_reverse, name="common_word_inspect_reverse"),


]
