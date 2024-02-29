<%@ page contentType="text/html; charset=UTF-8" %>
<div class="insertModalBack" id="insertModalBack" style="display: none;">
<div class="modal insertModal" id="insertModal">
    <ax:split-panel width="100%" style="padding: 10px;background-color: #222;">
        <ax:form id="formView01">
            <ax:tbl clazz="ax-form-tbl" minWidth="500px">
                <ax:tr labelWidth="120px">
                    <ax:td width="300px" labelWidth="120px">
                        <h2 style="line-height: 40px; padding-left:10px;">일정 등록</h2>
                        <!--<input type="hidden" id="insertScheduleStartDate" name="scheduleStartDate"/> -->
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.scheduleType" width="300px" labelWidth="120px">
                        <ax:common-code groupCd="SCHEDULE_TYPE" dataPath="scheduleType" clazz="form-control W150" id="insertScheduleType" defaultLabel="선택"/>
                    </ax:td>
                    <ax:td label="chargePlanMgnt.operationMode" width="300px" labelWidth="120px">
                        <ax:common-code groupCd="OPERATION_MODE" dataPath="operationMode" clazz="form-control W150" id="insertOperationMode" defaultLabel="선택"/>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.scheduleStartDate" width="300px" labelWidth="120px">
                        <div class="row">
                            <div class="col-md-9" style="width: 180px;">
                                <div class="input-group">
                                    <input type="text" name="scheduleStartDate" id="insertScheduleStartDate" class="form-control"
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
                                    <input type="text" name="scheduleEndDate" id="insertScheduleEndDate" class="form-control"
                                           placeholder="yyyy/mm/dd" readonly>
                                    <span class="input-group-addon"><span class="fa fa-calendar-o"></span></span>
                                </div>
                            </div>
                        </div>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.scheduleStartTime" width="300px" labelWidth="120px">
                        <select id="insertScheduleStartTime" name="scheduleStartTime" dataPath="scheduleStartTime" title="scheduleStartTime" class="av-required form-control W150 timePicker scheduleStartTime" ></select>
                    </ax:td>
                    <ax:td label="chargePlanMgnt.scheduleEndTime" width="300px" labelWidth="120px">
                        <select id="insertScheduleEndTime" name="scheduleEndTime" dataPath="scheduleEndTime" title="scheduleEndTime" class="av-required form-control W150 timePicker scheduleEndTime" ></select>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.targetUnit" width="300px" labelWidth="120px">
                        <ax:common-code groupCd="TARGET_UNIT" dataPath="targetUnit" name="targetUnit" clazz="form-control W150" id="insertTargetUnit" defaultLabel="선택"/>
                    </ax:td>
                    <ax:td label="chargePlanMgnt.targerAmount" width="300px" labelWidth="120px">
                        <input type="text" name="targetAmount" data-ax-path="manufacturerCode" maxlength="6" title="목표량" id="insertTargetAmount" placeholder="" class="W150 form-control" value=""/>
                    </ax:td>
                </ax:tr>
                <ax:tr labelWidth="120px">
                    <ax:td label="chargePlanMgnt.remark" width="300px" labelWidth="120px">
                        <textarea name="remarks" data-ax-path="remarks" id="insertRemarks" title="비고" placeholder="" class="W450 form-control" value="" maxlength="500" style="height: 80px;"></textarea>
                    </ax:td>
                </ax:tr>
            </ax:tbl>
        </ax:form>
        <div class="ax-button-group" role="panel-footer">
            <div class="right">
                <button type="button" class="btn btn-default" insert-form-view-01-btn="form-clear">
                    취소
                </button>
                <button type="button" class="btn btn-default" insert-form-view-01-btn="form-save">
                    등록
                </button>
            </div>
        </div>
    </ax:split-panel>
</div>
</div>
