// 核心匹配算法：同龄人优先 + 兴趣标签融合
export interface UserProfile {
  id: string;
  age: number;
  tags: string[];
  language: string;
}

export function findMatches(currentUser: UserProfile, allUsers: UserProfile[]) {
  const AGE_DIFF_LIMIT = 4; // 年龄差上限

  // 1. 强过滤：只保留年龄差在 ±4 岁以内的用户
  const ageFiltered = allUsers.filter(u => 
    u.id !== currentUser.id && Math.abs(u.age - currentUser.age) <= AGE_DIFF_LIMIT
  );

  // 2. 自适应融合打分：年龄越近分越高，标签重合越多分越高
  const scored = ageFiltered.map(u => {
    const ageScore = 100 - Math.abs(u.age - currentUser.age) * 10;
    const tagOverlap = u.tags.filter(t => currentUser.tags.includes(t)).length;
    const tagScore = tagOverlap * 20;
    const langBonus = u.language === currentUser.language ? 30 : 0;
    
    return { ...u, score: ageScore + tagScore + langBonus };
  });

  // 3. 按总分降序排列
  return scored.sort((a, b) => b.score - a.score);
}
