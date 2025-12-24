import { Response } from 'express';
import { getUserById } from '../../services/auth';
import { AuthRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const getProfile = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    return jsonResponse(res, 401, false, undefined, 'Unauthorized');
  }

  const user = await getUserById(req.user.userId);

  if (!user) {
    return jsonResponse(res, 404, false, undefined, 'User not found');
  }

  jsonResponse(res, 200, true, {
    id: user._id.toString(),
    email: user.email,
    createdAt: user.createdAt,
  });
});

export default getProfile;

