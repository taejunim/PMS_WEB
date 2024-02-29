package metis.app.pmsWeb.domain.user.role;

import metis.app.pmsWeb.domain.BaseJpaModel;
import com.chequer.axboot.core.annotations.ColumnPosition;
import com.chequer.axboot.core.annotations.Comment;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;


@Setter
@Getter
@DynamicInsert
@DynamicUpdate
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "SYSTEM_USER_ROLE")
@Comment(value = "사용자 역할 마스터")
@Alias("userRole")
public class UserRole extends BaseJpaModel<Long> {

    @Id
    @Column(name = "USER_ROLE_ID", precision = 19, nullable = false)
    @Comment(value = "사용자역할ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnPosition(1)
    private Long id;

    @Column(name = "USER_CD", length = 30, nullable = false)
    @Comment(value = "사용자ID")
    @ColumnPosition(2)
    private String userCd;

    @Column(name = "ROLE_CD", length = 100, nullable = false)
    @Comment(value = "역할ID")
    @ColumnPosition(3)
    private String roleCd;

    @Column(name = "ROLE_FLAG")
    @Comment(value = "역활 설정 여부")
    @ColumnPosition(4)
    private String roleFlag;

    @Override
    public Long getId() {
        return id;
    }
}
