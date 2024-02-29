package metis.app.pmsWeb.domain.user.auth;

import metis.app.pmsWeb.domain.BaseJpaModel;
import com.chequer.axboot.core.annotations.ColumnPosition;
import com.chequer.axboot.core.annotations.Comment;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "SYSTEM_USER_AUTH")
@Comment(value = "사용자 권한 마스터")
public class UserAuth extends BaseJpaModel<Long> {

    @Id
    @Column(name = "USER_AUTH_ID", precision = 19, nullable = false)
    @Comment(value = "사용자권한ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnPosition(1)
    private Long id;

    @Column(name = "USER_CD")
    @Comment(value = "사용자ID")
    @ColumnPosition(2)
    private String userCd;

    @Column(name = "GRP_AUTH_CD")
    @Comment(value = "권한그룹" +
            "ID")
    @ColumnPosition(3)
    private String grpAuthCd;

    @Column(name = "AUTH_FLAG")
    @Comment(value = "권한 여부")
    @ColumnPosition(4)
    private String authFlag;

    @Override
    public Long getId() {
        return id;
    }
}
