package metis.app.pmsWeb.domain.program.menu;

import lombok.Data;

import java.util.List;

@Data
public class MenuRequestVO {

    private List<Menu> list;

    private List<Menu> deletedList;
}
