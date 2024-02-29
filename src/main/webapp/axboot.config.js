(function () {
    if (axboot && axboot.def) {

        axboot.def["DEFAULT_TAB_LIST"] = [

            {menuId: "00-mainFix", id: "mainFix", progNm: '홈', menuNm: '홈', progPh: '/jsp/pmsWeb/monitoring/mainFix.jsp', url: '/jsp/pmsWeb/monitoring/mainFix.jsp?progCd=mainFix', status: "on", fixed: true}
            , {menuId: "00-mainCpcm", id: "mainCpcm", progNm: '홈', menuNm: '홈', progPh: '/jsp/pmsWeb/monitoring/mainCpcm.jsp', url: '/jsp/pmsWeb/monitoring/mainCpcm.jsp?progCd=mainCpcm', status: "on", fixed: true}
        ];

        axboot.def["MOBILE_DEFAULT_TAB_LIST"] = [

            {menuId: "00-mobileCpcm", id: "mobileCpcm", progNm: '운영 현황', menuNm: '운영 현황', progPh: '/jsp/pmsWeb/mobile/mobileCpcm.jsp', url: '/jsp/pmsWeb/mobile/mobileCpcm.jsp?progCd=mobileCpcm', status: "on", fixed: true}
            , {menuId: "00-mobileConfig", id: "mobileConfig", progNm: '환경 설정', menuNm: '환경 설정', progPh: '/jsp/pmsWeb/mobile/mobileConfig.jsp', url: '/jsp/pmsWeb/mobile/mobileConfig.jsp?progCd=mobileConfig', status: "on", fixed: true}


        ];

        axboot.def["API"] = {
            "users": "/users",
            "commonCodes": "/commonCodes",
            "programs": "/programs",
            "menu": "/menu",
            "manual": "/api/v1/manual",
            "errorLogs": "/errorLogs",
            "deviceManagement" : "/deviceManagement",           // 장비 관리
            "essManagement" : "/essManagement",                  // ess 관리
            "pmsManagement" : "/pmsManagement",                  // pms 관리
            "chargeDischargePlanMgnt" : "/chargeDischargePlanMgnt",                  // pms 관리
            "externalApiBaseInfo" : "/externalApiBaseInfo",                  // 외부 API 기초 정보 관리
            "externalApiDetailInfo" : "/externalApiDetailInfo",                  // 외부 API 상세 정보 관리
            "interfaceWeather" : "/interfaceWeather",   //날씨 조회
            "saleCompanyManagement" : "/saleCompanyManagement",    //판매처 관리
            "deviceDefectHistory" : "/deviceDefectHistory",
            "chargeDischargeHistory" : "/chargeDischargeHistory", //충방전 이력
            "deviceConfig" : "/deviceConfig", // 환경 설정
            "batteryRackStatusHistory" : "/batteryRackStatusHistory", // 배터리 RACK 상태 이력
            "pcsStatusHistory" : "/pcsStatusHistory", // pcs 1분간 상태 서머리
            "chargePlanPeriodMgnt" : "/chargePlanPeriodMgnt", // 충방전 계획 관리
            "commandControlHistory" : "/commandControlHistory", // commandControlHistory
            "chargeDischargeContractMgnt" : "/chargeDischargeContractMgnt", // 충방전 계약 관리
            "deviceErrorCode" : "/deviceErrorCode", // 장비 오류 코드 정보
            "deivceComponent" : "/deivceComponent", // 장비 구성요소정보
            "acConverter" : "/acConverter", // AC 컨버터 이력
            "dcConverter" : "/dcConverter", // DC 컨버터 이력
        };

        axboot.def["MODAL"] = {
            "ZIPCODE": {
                width: 500,
                height: 500,
                iframe: {
                    url: "/jsp/common/zipcode.jsp"
                }
            },
            "SAMPLE-MODAL": {
                width: 500,
                height: 500,
                iframe: {
                    url: "/jsp/_samples/modal.jsp"
                },
                header: false
            },
            "COMMON_CODE_MODAL": {
                width: 600,
                height: 400,
                iframe: {
                    url: "/jsp/system/system-config-common-code-modal.jsp"
                },
                header: false
            },
            "RELEASE-SPM-MODAL": {
                width: 600,
                height: 400,
                iframe: {
                    url: "/jsp/pmsWeb/release/release-spm-modal.jsp"
                },
                header: false
            },
            "REPAIR-COMPLETE-MODAL": {
                width: 630,
                height: 260,
                iframe: {
                    url: "/jsp/common/repair-complete-modal.jsp"
                },
                header: false
            },
            "MAIN-FIX-MODAL": {
                id: "fixControlModal",
                width: 800,
                height: 500,
                iframe: {
                    url: "/jsp/common/main-fix-modal.jsp"
                },
                header: false
            },
            "MAIN-CPCM-MODAL": {
                width: 1200,
                height: 600,
                iframe: {
                    url: "/jsp/common/main-cpcm-modal.jsp"
                },
                header: false
            },
            "CHARGE_PLAN_MGNT_MODAL": {
                width: 600,
                height: 680,
                iframe: {
                    url: "/jsp/common/charge-plan-mgnt-modal.jsp"
                },
                header: false
            },
            "CONTROL_MODAL": {
                width: 350,
                height: 160,
                iframe: {
                    url: "/jsp/common/control-modal.jsp"
                },
                header: false
            },
            "CONFIG_MODAL": {
                width: 350,
                height: 480,
                iframe: {
                    url: "/jsp/common/config-modal.jsp"
                },
                header: false
            },
            "NEW_CONTRACT_MODAL": {
                width: 1300,
                height: 600,
                iframe: {
                    url: "/jsp/pmsWeb/chargeMgnt/newContractTargetModal.jsp"
                },
                header: false
            },
            "CONTRACT_DETAIL_MODAL": {
                iframe: {
                    url: "/jsp/common/contract-detail-modal.jsp"
                },
                header: false
            }
        };
    }

    var preDefineUrls = {
        "manual_downloadForm": "/api/v1/manual/excel/downloadForm",
        "manual_viewer": "/jsp/system/system-help-manual-view.jsp"
    };
    axboot.getURL = function (url) {
        if (ax5.util.isArray(url)) {
            if (url[0] in preDefineUrls) {
                url[0] = preDefineUrls[url[0]];
            }
            return url.join('/');

        } else {
            return url;
        }
    }


})();