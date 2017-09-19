import lombok.Data;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.*;

@Data
public class Game {
    boolean inProgress;
    int numPlayers;
    boolean hasHunter;
    boolean hasDumbass;
    boolean hasKilled;
    int curLawOfficer = 1;
    int gameState;
    double wolfDelay;
    double witchDelay;
    double prophetDelay;
    boolean skillUsed;
    Map<Integer, User> players;
    Set<Integer> deadPlayers;
    Date date;
    double timestamp;

    public Game(int numPlayers, int numWolves, boolean hasHunter, boolean hasDumbass) {
        this.numPlayers = numPlayers;
        this.hasDumbass = hasDumbass;
        this.hasHunter = hasHunter;
        Random r = new Random();
        wolfDelay = 3.0 + (5.0 - 3.0) * r.nextDouble();
        witchDelay = 3.0 + (5.0 - 3.0) * r.nextDouble();
        prophetDelay = 3.0 + (5.0 - 3.0) * r.nextDouble();
        players = new HashMap<Integer, User>();
        deadPlayers = new HashSet<Integer>();
        List<User> playerList = new ArrayList<User>();

        for (int i = 0; i < numPlayers; i++) {
            playerList.add( new User(i + 1) );
        }
        Collections.shuffle( playerList );
        for (int i = 0; i < numPlayers; i++) {
            if (i < numWolves) {
                playerList.get(i).setIdentity( "wolf" );
                continue;
            }
            if (i == numWolves) {
                playerList.get(i).setIdentity( "prophet" );
                continue;
            }
            if (i == numWolves + 1) {
                playerList.get(i).setIdentity( "witch" );
                continue;
            }
            if (i == numWolves + 2 && hasHunter) {
                playerList.get(i).setIdentity( "hunter" );
                continue;
            }
            if (i == numWolves + 3 && hasDumbass) {
                playerList.get(i).setIdentity( "dumbass" );
                continue;
            }
            playerList.get(i).setIdentity( "villager" );
        }

        for (User u : playerList) {
            players.put( u.getUserId(), u );
        }
    }

    public void becomeLawOfficer(int userId) {
        players.get(curLawOfficer).setLawOfficer( false );
        players.get( userId ).setLawOfficer( true );
        curLawOfficer = userId;
    }

    public String getIdentity(int userId) {
        players.get(userId).setCheckedIdentity( true );
        return players.get(userId).getIdentity();
    }

    public List<Integer> getLastNightInfo() {
        List<Integer> deadPlayerList = new ArrayList<Integer>(deadPlayers);
        Collections.sort( deadPlayerList );
        return deadPlayerList;
    }

    /**
     *
     * @param usedSkill
     * @return  1 if wolf, 0 if not wolf, -1 if user is not prophet
     */
    public int useSkill(Skill usedSkill) {
        if (!hasKilled && usedSkill.getKilled() > 0) {
            deadPlayers.add( usedSkill.getKilled() );
            timestamp = date.getTime();
            skillUsed = true;
            return -1;
        }
        if (usedSkill.isSaved()) {
            deadPlayers.clear();
            timestamp = date.getTime();
            skillUsed = true;
            return -1;
        }
        else if (usedSkill.getPoisoned() > 0) {
            deadPlayers.add(usedSkill.getPoisoned());
            timestamp = date.getTime();
            skillUsed = true;
            return -1;
        }
        if (usedSkill.getChecked() > 0) {
            if (players.get(usedSkill.getChecked()).getIdentity().equals("wolf")) {
                timestamp = date.getTime();
                skillUsed = true;
                return 1;
            }
            else {
                timestamp = date.getTime();
                skillUsed = true;
                return 0;
            }
        }
        timestamp = date.getTime();
        return -1;
    }

    /**
     * 0 - Not Started
     * 1 - Wolf Turn
     * 2 - Witch Turn
     * 3 - Prophet Turn
     *
     * @return
     */
    public boolean startGame() {
        for (Map.Entry<Integer, User> player : players.entrySet()) {
            if (!player.getValue().isCheckedIdentity()) {
                return false;
            }
        }

        if (gameState == 0) {
            gameState++;
            return true;
        }

        return false;
    }

    public String getTrack() {
        switch (gameState) {
            case 1:
                if (skillUsed && date.getTime() > timestamp + wolfDelay * 1000) {
                    skillUsed = false;
                    gameState++;
                    return "witch";
                }
                break;
            case 2:
                if (skillUsed && date.getTime() > timestamp + witchDelay * 1000) {
                    skillUsed = false;
                    gameState++;
                    return "prophet";
                }
                break;
            case 3:
                if (skillUsed && date.getTime() > timestamp + prophetDelay * 1000) {
                    skillUsed = false;
                    gameState = 0;
                    return "day";
                }

            default:
                break;
        }
        return "";
    }
}
