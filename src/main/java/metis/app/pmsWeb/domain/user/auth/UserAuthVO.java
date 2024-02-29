package metis.app.pmsWeb.domain.user.auth;

import com.chequer.axboot.core.utils.ModelMapperUtils;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
@NoArgsConstructor
public class UserAuthVO {

    private String userCd;

    private String userNm;

    private String grpAuthCd;

    private String grpAuthNm;

    private String remark;

    private String useYn;

    private String authFlag;

    public static UserAuthVO of(UserAuth userAuth) {
        UserAuthVO userAuthVTO = ModelMapperUtils.map(userAuth, UserAuthVO.class);

        try {
            //userAuthVTO.setGrpAuthNm(userAuth.getAuthGroup().getGrpAuthNm());
        } catch (RuntimeException e) {
            // ignore
        }

        try {
        } catch (RuntimeException e) {
            // ignore
        }

        return userAuthVTO;
    }

    public static List<UserAuthVO> of(List<UserAuth> userAuthList) {
        return userAuthList.stream().map(userAuth -> of(userAuth)).collect(toList());
    }
}
