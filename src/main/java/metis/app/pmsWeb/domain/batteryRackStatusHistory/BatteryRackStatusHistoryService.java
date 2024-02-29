package metis.app.pmsWeb.domain.batteryRackStatusHistory;

import metis.app.pmsWeb.domain.BaseService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BatteryRackStatusHistoryService extends BaseService<BatteryRackStatusHistoryVO, String> {
    @Inject
    private BatteryRackStatusHistoryMapper batteryRackStatusHistoryMapper;

    /**
     * 배터리 RACK 상태 이력 목록 조회
     * @param map
     * @return
     */
    public Map<String, Object> select(Map<String, Object> map) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", batteryRackStatusHistoryMapper.select(map));
        resultMap.put("page", batteryRackStatusHistoryMapper.selectTotalCount(map));
        return resultMap;
    }


    public Map<String, Object> selectModule(Map<String, Object> map){
        Map<String, Object> resultMap = new HashMap<>();

        List<BatteryModuleStatusHistoryVO> batteryModuleStatusList = batteryRackStatusHistoryMapper.selectModule(map);

        int fieldCount = BatteryModuleStatusHistoryVO.class.getDeclaredFields().length;
        List<Map<String,Object>> resultList = new ArrayList<>();

        for(int i = 0 ; i < fieldCount - 1 ; i ++) {

            Map<String, Object> result = new HashMap<>();
            for(int j = 0 ; j < batteryModuleStatusList.size() ; j ++) {

                String value = "";

                switch (i) {
                    case 0 : value = batteryModuleStatusList.get(j).getTotalVolt();
                        break;
                    case 1 : value = batteryModuleStatusList.get(j).getBalanceYn();
                        break;
                    case 2 : value = batteryModuleStatusList.get(j).getCell1Volt();
                        break;
                    case 3 : value = batteryModuleStatusList.get(j).getCell2Volt();
                        break;
                    case 4 : value = batteryModuleStatusList.get(j).getCell3Volt();
                        break;
                    case 5 : value = batteryModuleStatusList.get(j).getCell4Volt();
                        break;
                    case 6 : value = batteryModuleStatusList.get(j).getCell5Volt();
                        break;
                    case 7 : value = batteryModuleStatusList.get(j).getCell6Volt();
                        break;
                    case 8 : value = batteryModuleStatusList.get(j).getCell7Volt();
                        break;
                    case 9 : value = batteryModuleStatusList.get(j).getCell8Volt();
                        break;
                    case 10 : value = batteryModuleStatusList.get(j).getCell9Volt();
                        break;
                    case 11 : value = batteryModuleStatusList.get(j).getCell10Volt();
                        break;
                    case 12 : value = batteryModuleStatusList.get(j).getCell11Volt();
                        break;
                    case 13 : value = batteryModuleStatusList.get(j).getCell12Volt();
                        break;
                    case 14 : value = batteryModuleStatusList.get(j).getCell13Volt();
                        break;
                    case 15 : value = batteryModuleStatusList.get(j).getCell14Volt();
                        break;
                    case 16 : value = batteryModuleStatusList.get(j).getCell15Volt();
                        break;
                    case 17 : value = batteryModuleStatusList.get(j).getCell16Volt();
                        break;
                    case 18 : value = batteryModuleStatusList.get(j).getTemperature1();
                        break;
                    case 19 : value = batteryModuleStatusList.get(j).getTemperature2();
                        break;
                    case 20 : value = batteryModuleStatusList.get(j).getTemperature3();
                        break;
                    case 21 : value = batteryModuleStatusList.get(j).getTemperature4();
                        break;
                    case 22 : value = batteryModuleStatusList.get(j).getTemperature5();
                        break;
                    case 23 : value = batteryModuleStatusList.get(j).getTemperature6();
                        break;
                    case 24 : value = batteryModuleStatusList.get(j).getTemperature7();
                        break;
                    case 25 : value = batteryModuleStatusList.get(j).getTemperature8();
                        break;
                    case 26 : value = batteryModuleStatusList.get(j).getCell1BalanceFlag();
                        break;
                    case 27 : value = batteryModuleStatusList.get(j).getCell2BalanceFlag();
                        break;
                    case 28 : value = batteryModuleStatusList.get(j).getCell3BalanceFlag();
                        break;
                    case 29 : value = batteryModuleStatusList.get(j).getCell4BalanceFlag();
                        break;
                    case 30 : value = batteryModuleStatusList.get(j).getCell5BalanceFlag();
                        break;
                    case 31 : value = batteryModuleStatusList.get(j).getCell6BalanceFlag();
                        break;
                    case 32 : value = batteryModuleStatusList.get(j).getCell7BalanceFlag();
                        break;
                    case 33 : value = batteryModuleStatusList.get(j).getCell8BalanceFlag();
                        break;
                    case 34 : value = batteryModuleStatusList.get(j).getCell9BalanceFlag();
                        break;
                    case 35 : value = batteryModuleStatusList.get(j).getCell10BalanceFlag();
                        break;
                    case 36 : value = batteryModuleStatusList.get(j).getCell11BalanceFlag();
                        break;
                    case 37 : value = batteryModuleStatusList.get(j).getCell12BalanceFlag();
                        break;
                    case 38 : value = batteryModuleStatusList.get(j).getCell13BalanceFlag();
                        break;
                    case 39 : value = batteryModuleStatusList.get(j).getCell14BalanceFlag();
                        break;
                    case 40 : value = batteryModuleStatusList.get(j).getCell15BalanceFlag();
                        break;
                    case 41 : value = batteryModuleStatusList.get(j).getCell16BalanceFlag();
                        break;
                    default : break;
                }

                if(j == 0) result.put("label",value);
                else result.put("column" + j , value);
            }

            resultList.add(result);
        }

        resultMap.put("list", resultList);
        return resultMap;
    }

    /**
     * 배터리 RACK 상태 이력 개수 가져오기 (배터리 RACK 상태 이력 테이블 전체 Row 개수)
     * @return
     */
    public int selectTotalCountRack(){

        return batteryRackStatusHistoryMapper.selectTotalCountRack();
    }

    /**
     * 배터리 Module 상태 이력 개수 가져오기 (배터리 RACK 상태 이력 테이블 전체 Row 개수)
     * @return
     */
    int selectTotalCountModule(Map<String, Object> map){

        return batteryRackStatusHistoryMapper.selectTotalCountModule(map);
    }
}
