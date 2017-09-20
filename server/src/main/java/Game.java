import lombok.Data;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.*;

@Data
public class Game {
    static boolean inProgress;
    static int numPlayers;
    static boolean hasHunter;
    static boolean hasDumbass;
    static boolean hasKilled;
    static int curLawOfficer = 1;
    static int gameState;
    static double wolfDelay;
    static double witchDelay;
    static double prophetDelay;
    static boolean skillUsed;
    static int numWolves;
    static Map<Integer, User> players;
    static Set<Integer> deadPlayers;
    static List<User> playerList;
    static long timestamp;

    public static void startGame(int numPlayers, int numWolves, boolean hasHunter, boolean hasDumbass) {
        Game.numPlayers = numPlayers;
        Game.hasDumbass = hasDumbass;
        Game.hasHunter = hasHunter;
        Game.numWolves = numWolves;
        Random r = new Random();
        wolfDelay = 3.0 + (5.0 - 3.0) * r.nextDouble();
        witchDelay = 3.0 + (5.0 - 3.0) * r.nextDouble();
        prophetDelay = 3.0 + (5.0 - 3.0) * r.nextDouble();
        players = new HashMap<>();
        deadPlayers = new HashSet<>();
        playerList = new ArrayList<>();

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

    public static void becomeLawOfficer(int userId) {
        players.get(curLawOfficer).setLawOfficer( false );
        players.get( userId ).setLawOfficer( true );
        curLawOfficer = userId;
    }

    public static String getIdentity(int userId) {
        players.get(userId).setCheckedIdentity( true );
        System.out.println(players.get(userId).getIdentity());
        return players.get(userId).getIdentity();
    }

    public static List<Integer> getLastNightInfo() {
        List<Integer> deadPlayerList = new ArrayList<Integer>(deadPlayers);
        Collections.sort( deadPlayerList );
        return deadPlayerList;
    }

    /**
     *
     * @param usedSkill
     * @return  1 if wolf, 0 if not wolf, -1 if user is not prophet
     */
    public static int useSkill(Skill usedSkill) {
        try {
            if (!hasKilled && usedSkill.getKilled() > 0) {
                deadPlayers.add(usedSkill.getKilled());
                timestamp = System.currentTimeMillis();
                skillUsed = true;
                return -1;
            }
            if (usedSkill.isSaved()) {
                deadPlayers.clear();
                timestamp = System.currentTimeMillis();
                skillUsed = true;
                return -1;
            } else if (usedSkill.getPoisoned() > 0) {
                deadPlayers.add(usedSkill.getPoisoned());
                timestamp = System.currentTimeMillis();
                skillUsed = true;
                return -1;
            }
            if (usedSkill.getChecked() > 0) {
                if (players.get(usedSkill.getChecked()).getIdentity().equals("wolf")) {
                    timestamp = System.currentTimeMillis();
                    skillUsed = true;
                    return 1;
                } else {
                    timestamp = System.currentTimeMillis();
                    skillUsed = true;
                    return 0;
                }
            }
            timestamp = System.currentTimeMillis();
            return -1;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    /**
     * 0 - Not Started
     * 1 - Wolf Turn
     * 2 - Witch Turn
     * 3 - Prophet Turn
     *
     * @return
     */
    public static boolean enterNight() {
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

    public static String getTrack() {
        System.out.println( timestamp + wolfDelay * 1000 );
        System.out.println(gameState);
        System.out.println(System.currentTimeMillis());
        System.out.println(skillUsed);
        switch (gameState) {
            case 1:
                if (skillUsed && (System.currentTimeMillis() > (int)(timestamp + wolfDelay * 1000))) {
                    skillUsed = false;
                    gameState++;
                    return "witch";
                }
                break;
            case 2:
                if (skillUsed && (System.currentTimeMillis() > (int)(timestamp + witchDelay * 1000))) {
                    skillUsed = false;
                    gameState++;
                    return "prophet";
                }
                break;
            case 3:
                if (skillUsed && (System.currentTimeMillis() > (int)(timestamp + prophetDelay * 1000))) {
                    skillUsed = false;
                    gameState = 0;
                    return "day";
                }

            default:
                break;
        }
        return "";
    }

    public static void reshuffle() {
        gameState = 0;
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

        players.clear();
        for (User u : playerList) {
            players.put( u.getUserId(), u );
        }

        Random r = new Random();
        wolfDelay = 3.0 + (5.0 - 3.0) * r.nextDouble();
        witchDelay = 3.0 + (5.0 - 3.0) * r.nextDouble();
        prophetDelay = 3.0 + (5.0 - 3.0) * r.nextDouble();
        timestamp = 0;
    }
}
