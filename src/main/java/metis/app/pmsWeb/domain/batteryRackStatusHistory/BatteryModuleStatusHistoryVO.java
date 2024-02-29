package metis.app.pmsWeb.domain.batteryRackStatusHistory;

import lombok.Data;

@Data
public class BatteryModuleStatusHistoryVO {

    private String label;               //라벨

    private String totalVolt;           //총 전압 (V)
    private String balanceYn;           //셀 밸런싱 여부
    private String cell1Volt;           //Cell 1. 전압(V)
    private String cell2Volt;           //Cell 2. 전압(V)
    private String cell3Volt;           //Cell 3. 전압(V)
    private String cell4Volt;           //Cell 4. 전압(V)
    private String cell5Volt;           //Cell 5. 전압(V)
    private String cell6Volt;           //Cell 6. 전압(V)
    private String cell7Volt;           //Cell 7. 전압(V)
    private String cell8Volt;           //Cell 8. 전압(V)
    private String cell9Volt;           //Cell 9. 전압(V)
    private String cell10Volt;          //Cell 10. 전압(V)
    private String cell11Volt;          //Cell 11. 전압(V)
    private String cell12Volt;          //Cell 12. 전압(V)
    private String cell13Volt;          //Cell 13. 전압(V)
    private String cell14Volt;          //Cell 14. 전압(V)
    private String cell15Volt;          //Cell 15. 전압(V)
    private String cell16Volt;          //Cell 16. 전압(V)
    private String temperature1;        //Cell 온도 1 (℃)
    private String temperature2;        //Cell 온도 2 (℃)
    private String temperature3;        //Cell 온도 3 (℃)
    private String temperature4;        //Cell 온도 4 (℃)
    private String temperature5;        //Cell 온도 5 (℃)
    private String temperature6;        //Cell 온도 6 (℃)
    private String temperature7;        //Cell 온도 7 (℃)
    private String temperature8;        //Cell 온도 8 (℃)
    private String cell1BalanceFlag;    //Cell 1.  밸런싱 여부
    private String cell2BalanceFlag;    //Cell 2.  밸런싱 여부
    private String cell3BalanceFlag;    //Cell 3.  밸런싱 여부
    private String cell4BalanceFlag;    //Cell 4.  밸런싱 여부
    private String cell5BalanceFlag;    //Cell 5.  밸런싱 여부
    private String cell6BalanceFlag;    //Cell 6.  밸런싱 여부
    private String cell7BalanceFlag;    //Cell 7.  밸런싱 여부
    private String cell8BalanceFlag;    //Cell 8.  밸런싱 여부
    private String cell9BalanceFlag;    //Cell 9.  밸런싱 여부
    private String cell10BalanceFlag;   //Cell 10. 밸런싱 여부
    private String cell11BalanceFlag;   //Cell 11. 밸런싱 여부
    private String cell12BalanceFlag;   //Cell 12. 밸런싱 여부
    private String cell13BalanceFlag;   //Cell 13. 밸런싱 여부
    private String cell14BalanceFlag;   //Cell 14. 밸런싱 여부
    private String cell15BalanceFlag;   //Cell 15. 밸런싱 여부
    private String cell16BalanceFlag;   //Cell 16. 밸런싱 여부
}