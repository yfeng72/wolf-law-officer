import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Skill {
    int userId;
    int killed;
    int poisoned;
    boolean saved;
    int checked;
}
