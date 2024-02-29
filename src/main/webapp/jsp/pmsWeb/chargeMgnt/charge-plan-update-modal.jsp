<%@ page contentType="text/html; charset=UTF-8" %>
<div class="updateModalBack" id="updateModalBack" style="display: none;">
<div class="modal insertModal" id="updateModal">
    <ax:split-panel width="100%" style="padding: 10px;background-color: #222;">
        <ax:form id="formView02">
            <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                <ax:tr labelWidth="120px">
                    <ax:td width="300px" labelWidth="120px">
                        <h2 style="line-height: 40px; padding-left:10px;">일정 상세</h2>
                        <!--<input type="hidden" id="updateScheduleStartDate" name="scheduleStartDate"/>-->
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.scheduleNo" width="300px" labelWidth="120px">
                        <input type="hidden" name="scheduleNo" data-ax-path="scheduleNo" maxlength="16" title="일정 번호" id="updateScheduleNo" placeholder="" class="W150 form-control updateFormControl"/>
                        <input type="text" maxlength="16" title="일정 번호" id="updateShowScheduleNo" placeholder="" class="W150 form-control" readonly/>
                    </ax:td>
                    <ax:td label="chargePlanMgnt.scheduleStatus" width="300px" labelWidth="120px">
                        <input type="text" name="scheduleStatus" data-ax-path="scheduleStatus" maxlength="10" title="일정 상태" id="updateScheduleStatus" placeholder="" class="W150 form-control updateFormControl" readonly/>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.scheduleType" width="300px" labelWidth="120px">
                        <ax:common-code groupCd="SCHEDULE_TYPE" dataPath="scheduleType" clazz="form-control W150 updateFormControl" id="updateScheduleType" defaultLabel="선택"/>
                    </ax:td>
                    <ax:td label="chargePlanMgnt.operationMode" width="300px" labelWidth="120px">
                        <ax:common-code groupCd="OPERATION_MODE" dataPath="operationMode" clazz="form-control W150 updateFormControl" id="updateOperationMode" defaultLabel="선택"/>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.scheduleStartDate" width="300px" labelWidth="120px">
                        <div class="row">
                            <div class="col-md-9" style="width: 180px;">
                                <div class="input-group">
                                    <input type="text" name="scheduleStartDate" id="updateScheduleStartDate" class="form-control"
                                           placeholder="yyyy/mm/dd" readonly>
                                    <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                </div>
                            </div>
                        </div>
                    </ax:td>
                    <ax:td label="chargePlanMgnt.scheduleEndDate" width="300px" labelWidth="120px">
                        <div class="row">
                            <div class="col-md-9" style="width: 180px;">
                                <div class="input-group" data-ax5picker="basic">
                                    <input type="text" name="scheduleEndDate" id="updateScheduleEndDate" class="form-control updateFormControl"
                                           placeholder="yyyy/mm/dd" readonly>
                                    <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                </div>
                            </div>
                        </div>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.scheduleStartTime" width="300px" labelWidth="120px">
                        <select id="updateScheduleStartTime" name="scheduleStartTime" dataPath="scheduleStartTime" title="scheduleStartTime" class="av-required form-control W150 timePicker scheduleStartTime updateFormControl" ></select>
                    </ax:td>
                    <ax:td label="chargePlanMgnt.scheduleEndTime" width="300px" labelWidth="120px">
                        <select id="updateScheduleEndTime" name="scheduleEndTime" dataPath="scheduleEndTime" title="scheduleEndTime" class="av-required form-control W150 timePicker scheduleEndTime updateFormControl" ></select>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.targetUnit" width="300px" labelWidth="120px">
                        <ax:common-code groupCd="TARGET_UNIT" dataPath="targetUnit" name="targetUnit" clazz="form-control W150 updateFormControl" id="updateTargetUnit" defaultLabel="선택"/>
                    </ax:td>
                    <ax:td label="chargePlanMgnt.targerAmount" width="300px" labelWidth="120px">
                        <input type="text" name="targetAmount" data-ax-path="manufacturerCode" maxlength="6" title="목표량" id="updateTargetAmount" placeholder="" class="W150 form-control updateFormControl" value=""/>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.runStartDateTime" width="300px" labelWidth="120px">
                        <input type="text" name="runStartDateTime" data-ax-path="runStartDateTime"title="실행 시작 일시" id="updateRunStartDateTime" placeholder="" class="W150 form-control updateFormControl" readonly/>
                    </ax:td>
                    <ax:td label="chargePlanMgnt.runEndDateTime" width="300px" labelWidth="120px">
                        <input type="text" name="runEndDateTime" data-ax-path="runEndDateTime"title="실행 종료 일시" id="updateRunEndDateTime" placeholder="" class="W150 form-control updateFormControl" readonly/>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.remark" width="300px" labelWidth="120px">
                        <textarea name="remarks" data-ax-path="remarks" id="updateRemarks" title="비고" placeholder="" class="W450 form-control updateFormControl" value="" maxlength="500" style="height: 80px;"></textarea>
                    </ax:td>
                </ax:tr>
            </ax:tbl>
        </ax:form>
        <div class="ax-button-group" role="panel-footer">
            <div class="right">
                <button type="button" class="btn btn-default hiddenButton" update-form-view-01-btn="form-cancel">
                    예약 취소
                </button>
                <button type="button" class="btn btn-default hiddenButton" update-form-view-01-btn="form-update">
                    수정
                </button>
                <button type="button" class="btn btn-default" update-form-view-01-btn="form-clear">
                    확인
                </button>
            </div>
        </div>
    </ax:split-panel>
</div>
</div>
