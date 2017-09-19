import lombok.Data;

@Data
public class User {
    private int userId;
    private String identity;
    private boolean isLawOfficer;
    private boolean checkedIdentity;

    public User(int id) {
        this.userId = id;
    }
}
