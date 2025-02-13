import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js'
import { getGameSession } from '../../sessions/game.session.js'
import { addUser } from '../../sessions/user.session.js'
import { createResponse } from '../../utils/response/createResponse.js'

const initialHandler = ({ socket, userId, payload }) => {
    try{
        const { deviceId, playerId, latency } = payload;
        const user = addUser(socket, deviceId, playerId, latency);
        const gameSession = getGameSession();
        gameSession.addUser(user);

        const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, {
            userId: deviceId,
        });

        socket.write(initialResponse)
    } catch (e) {
        console.error(e);
    }
};

export default initialHandler;