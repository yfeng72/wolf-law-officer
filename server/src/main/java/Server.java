import static spark.Spark.*;

public class Server {
    private static void enableCORS( final String origin, final String methods, final String headers ) {

        options( "/*", ( request, response ) -> {

            String accessControlRequestHeaders = request.headers( "Access-Control-Request-Headers" );
            if ( accessControlRequestHeaders != null ) {
                response.header( "Access-Control-Allow-Headers", accessControlRequestHeaders );
            }

            String accessControlRequestMethod = request.headers( "Access-Control-Request-Method" );
            if ( accessControlRequestMethod != null ) {
                response.header( "Access-Control-Allow-Methods", accessControlRequestMethod );
            }

            return "OK";
        } );

        before( ( request, response ) -> {
            response.header( "Access-Control-Allow-Origin", origin );
            response.header( "Access-Control-Request-Method", methods );
            response.header( "Access-Control-Allow-Headers", headers );
            // Note: this may or may not be necessary in your particular application
            response.type( "application/json" );
        } );
    }

    public static void main( String[] args ) {
        enableCORS( "*", "*", "*" );
        Game game;
        get( "/createGame/*", ( req, res ) -> {
            int numPlayers = Integer.valueOf(req.queryParams( "numPlayers" ));
            int numWolves = Integer.valueOf(req.queryParams( "numWolves" ));
            boolean hasHunter = Boolean.parseBoolean(req.queryParams( "hasHunter" ));
            boolean hasDumbass = Boolean.parseBoolean(req.queryParams( "hasDumbass" ));

            Game.startGame(numPlayers, numWolves, hasHunter, hasDumbass);

            return "";
        } );
        get( "/becomeLawOfficer/:userId", ( req, res ) -> {
            int userId = Integer.valueOf(req.params( ":userId" ));

            Game.becomeLawOfficer(userId);

            return "";
        } );
        get( "/getIdentity/:userId", ( req, res ) -> {
            int userId = Integer.valueOf(req.params( ":userId" ));

            return Game.getIdentity(userId);
        } );
        get( "useSkill/*", (req, res) -> {
            int userId = Integer.valueOf(req.queryParams( "userId" ));
            int killed = Integer.valueOf(req.queryParams( "killed" ));
            int poisoned = Integer.valueOf(req.queryParams( "poisoned" ));
            int checked = Integer.valueOf(req.queryParams( "checked" ));
            boolean saved = Boolean.parseBoolean(req.queryParams( "saved" ));
            Skill skill = new Skill(userId, killed, poisoned, saved, checked);

            return Game.useSkill(skill);
        });
        get( "startGame/*", (req, res) -> {
            return Game.enterNight();
        });
        get( "getTrack/*", (req, res) -> {
            return Game.getTrack();
        });
        get( "reshuffle/*", (req, res) -> {
            Game.reshuffle();
            return "";
        });
        get( "lastNightInfo/*", (req, res) -> {
            return Game.getLastNightInfo();
        });
    }
}