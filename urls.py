
from django.urls import path
from . import views
urlpatterns = [
    path('',views.Dashboard,name='Dashboard_page'),
    path('Dashboard',views.Dashboard,name='Dashboard_page'),
    path('workflowStepDetail',views.workflowStepDetail,name='Step_detail_page'),
    path('Home',views.Home,name='Home_page'),

]
