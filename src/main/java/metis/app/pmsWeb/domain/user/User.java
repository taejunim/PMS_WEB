package metis.app.pmsWeb.domain.user;

import metis.app.pmsWeb.domain.BaseJpaModel;
import metis.app.pmsWeb.domain.user.auth.UserAuth;
import metis.app.pmsWeb.domain.user.role.UserRole;
import com.chequer.axboot.core.annotations.ColumnPosition;
import com.chequer.axboot.core.annotations.Comment;
import com.chequer.axboot.core.code.AXBootTypes;
import com.chequer.axboot.core.code.Types;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.List;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "SYSTEM_USER")
@Comment(value = "로그인 사용자 마스터")
@Alias("user")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userCd")
public class User extends BaseJpaModel<String> {

    @Id
    @Column(name = "USER_CD", length = 30, nullable = false)
    @Comment(value = "사용자ID")
    @ColumnPosition(1)
    @Size(max = 20, message = "아이디는 20자 이상을 넘어갈 수 없습니다.")
    @NotBlank(message = "아이디 필수 입력")
    private String userCd;

    @Column(name = "USER_NM", length = 30, nullable = false)
    @Comment(value = "사용자명")
    @ColumnPosition(2)
    @NotBlank(message = "사용자명 필수 입력")
    private String userNm;

    @Column(name = "USER_PS", length = 128, nullable = false)
    @Comment(value = "비밀번호")
    @ColumnPosition(3)
    private String userPs;

    @Column(name = "EMAIL", length = 50)
    @Comment(value = "이메일")
    @ColumnPosition(4)
    private String email;

    @Column(name = "HP_NO", length = 15)
    @Comment(value = "휴대폰")
    @ColumnPosition(5)
    private String hpNo;

    @Column(name = "REMARK_200", length = 200)
    @Comment(value = "비고")
    @ColumnPosition(6)
    private String remark;

    @Column(name = "LAST_LOGIN_DATE")
    @Comment(value = "마지막로그인일시")
    @ColumnPosition(7)
    private Instant lastLoginDate;

    @Column(name = "PASSWORD_UPDATE_DATE")
    @Comment(value = "비밀번호변경일시")
    @ColumnPosition(8)
    private Instant passwordUpdateDate;

    @Column(name = "USER_STATUS", length = 10)
    @Comment(value = "사용자 상태")
    @Type(type = "labelEnum")
    @ColumnPosition(9)
    private Types.UserStatus userStatus = Types.UserStatus.NORMAL;

    @Column(name = "IP", length = 100)
    @Comment(value = "IP")
    @ColumnPosition(10)
    private String ip;

    @Column(name = "LOCALE", length = 10)
    @Comment(value = "Locale")
    @ColumnPosition(11)
    private String locale = "ko_KR";

    @Column(name = "MENU_GRP_CD", length = 100)
    @Comment(value = "메뉴그룹코드")
    @ColumnPosition(12)
    private String menuGrpCd;

    @Column(name = "USE_YN", length = 1, nullable = false)
    @Comment(value = "사용여부")
    @Type(type = "labelEnum")
    @ColumnPosition(13)
    private AXBootTypes.Used useYn = AXBootTypes.Used.YES;

    @Column(name = "DEL_YN", length = 1)
    @Comment(value = "삭제여부")
    @Type(type = "labelEnum")
    @ColumnPosition(14)
    private AXBootTypes.Deleted delYn = AXBootTypes.Deleted.NO;

    @Transient
    private List<UserRole> roleList;

    @Transient
    private List<UserAuth> authList;

    @Override
    public String getId() {
        return userCd;
    }

    @Transient
    public String loginMessage;

    @Transient
    public String loginCode;

    @Transient

    public List<UserRole> userRoles;

    @Transient
    private Integer custUserSeq;

    @Transient
    private Integer custSeq;

    @Transient
    private String smsYn;

    @Transient
    private String custNm;


    @Transient
    private String loginStatus;
}
