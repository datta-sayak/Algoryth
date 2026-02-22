import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/db/connect';
import { verifyToken } from '../../../../lib/db/middleware';
import UserBadge from '../../../../lib/db/models/UserBadge';
import Badge from '../../../../lib/db/models/Badge';

/**
 * GET /api/badges/user
 * Get all badges earned by the current user
 */
export async function GET(request) {
  try {
    // Verify user token
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const { valid, decoded } = verifyToken(token);

    if (!valid || !decoded.userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const userId = decoded.userId;

    // Get user's earned badges
    const userBadges = await UserBadge.find({ userId })
      .populate('badgeId')
      .sort({ awardedAt: -1 })
      .select('-__v');

    // Get badge details for each earned badge
    const badgeIds = userBadges.map(ub => ub.badgeId);
    const badges = await Badge.find({ badgeId: { $in: badgeIds.map(b => b.badgeId || b) } })
      .select('-__v');

    // Combine userBadge and badge data
    const earnedBadgesWithDetails = userBadges.map(userBadge => {
      const badgeDetails = badges.find(b => b.badgeId === userBadge.badgeId.badgeId || b._id.toString() === userBadge.badgeId._id.toString());
      return {
        ...userBadge.toObject(),
        badgeDetails,
      };
    });

    return NextResponse.json({
      badges: earnedBadgesWithDetails,
      total: earnedBadgesWithDetails.length,
    });
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user badges' },
      { status: 500 }
    );
  }
}


