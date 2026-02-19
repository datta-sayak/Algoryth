'use client';

import React from 'react';
import { CheckCircle, Code, Trophy, Zap } from 'lucide-react';

export default function DashboardStats({ submissions = [], stats = null }) {
  // Use provided stats if available, otherwise calculate from submissions
  let displayStats = stats;

  if (!stats && submissions.length > 0) {
    const solvedProblems = submissions.filter(s => s.status === 'Accepted' || s.verdict === 'Accepted');
    
    // Calculate unique solved problems by difficulty
    const uniqueSolved = {};
    solvedProblems.forEach(s => {
      const key = s.problemSlug || s.problemId || s.id || s._id;
      uniqueSolved[key] = s.difficulty;
    });

    displayStats = {
      total: Object.keys(uniqueSolved).length,
      acceptedSubmissions: solvedProblems.length,
      totalSubmissions: submissions.length,
      easy: Object.values(uniqueSolved).filter(d => d === 'Easy').length,
      medium: Object.values(uniqueSolved).filter(d => d === 'Medium').length,
      hard: Object.values(uniqueSolved).filter(d => d === 'Hard').length,
    };
  } else if (!stats) {
    displayStats = {
      total: 0,
      acceptedSubmissions: 0,
      totalSubmissions: 0,
      easy: 0,
      medium: 0,
      hard: 0,
    };
  }

  // Language frequency
  const languages = {};
  submissions.forEach(s => {
    const lang = s.language || 'unknown';
    languages[lang] = (languages[lang] || 0) + 1;
  });
  
  const sortedLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalPossible = 100; // Placeholder for total problems in system
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Overview Card */}
      <div className="rounded-2xl border border-[#e0d5c2] bg-[#fff8ed] p-6 dark:border-[#3c3347] dark:bg-[#211d27]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7a67] dark:text-[#b5a59c]">Overview</h3>
          <Trophy className="h-5 w-5 text-[#d69a44] dark:text-[#f2c66f]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[#2b2116] dark:text-[#f6ede0]">
            {displayStats?.uniqueProblems || displayStats?.total || 0}
          </span>
          <span className="text-sm text-[#5d5245] dark:text-[#d7ccbe]">problems solved</span>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-2 flex-1 rounded-full bg-[#f2e3cc] dark:bg-[#2d2535] overflow-hidden">
            <div 
              className="h-full bg-[#d69a44] dark:bg-[#f2c66f]" 
              style={{ width: `${Math.min(100, ((displayStats?.uniqueProblems || displayStats?.total || 0) / totalPossible) * 100)}%` }}
            />
          </div>
        </div>
        {displayStats?.successRate && (
          <div className="mt-2 text-sm text-[#5d5245] dark:text-[#d7ccbe]">
            Success Rate: {displayStats.successRate}%
          </div>
        )}
      </div>

      {/* Difficulty Breakdown */}
      <div className="rounded-2xl border border-[#e0d5c2] bg-[#fff8ed] p-6 dark:border-[#3c3347] dark:bg-[#211d27]">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7a67] dark:text-[#b5a59c] mb-6">Difficulty</h3>
        <div className="space-y-4">
          {displayStats?.difficultyBreakdown ? (
            <>
              <DifficultyRow label="Easy" count={displayStats.difficultyBreakdown.Easy} color="text-green-600 dark:text-green-400" />
              <DifficultyRow label="Medium" count={displayStats.difficultyBreakdown.Medium} color="text-yellow-600 dark:text-yellow-400" />
              <DifficultyRow label="Hard" count={displayStats.difficultyBreakdown.Hard} color="text-red-600 dark:text-red-400" />
            </>
          ) : (
            <>
              <DifficultyRow label="Easy" count={displayStats?.easy || 0} color="text-green-600 dark:text-green-400" />
              <DifficultyRow label="Medium" count={displayStats?.medium || 0} color="text-yellow-600 dark:text-yellow-400" />
              <DifficultyRow label="Hard" count={displayStats?.hard || 0} color="text-red-600 dark:text-red-400" />
            </>
          )}
        </div>
      </div>

      {/* Languages */}
      <div className="rounded-2xl border border-[#e0d5c2] bg-[#fff8ed] p-6 dark:border-[#3c3347] dark:bg-[#211d27]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8a7a67] dark:text-[#b5a59c]">Languages</h3>
          <Code className="h-5 w-5 text-[#8a7a67] dark:text-[#b5a59c]" />
        </div>
        {displayStats?.languageUsage && Object.keys(displayStats.languageUsage).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(displayStats.languageUsage).map(([lang, count]) => (
              <div key={lang} className="flex items-center justify-between group">
                <span className="text-sm font-medium text-[#5d5245] dark:text-[#d7ccbe] capitalize">{lang}</span>
                <span className="text-xs font-mono bg-[#f2e3cc] dark:bg-[#2d2535] px-2 py-0.5 rounded text-[#2b2116] dark:text-[#f6ede0]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        ) : sortedLanguages.length > 0 ? (
          <div className="space-y-3">
            {sortedLanguages.map(([lang, count]) => (
              <div key={lang} className="flex items-center justify-between group">
                <span className="text-sm font-medium text-[#5d5245] dark:text-[#d7ccbe] capitalize">{lang}</span>
                <span className="text-xs font-mono bg-[#f2e3cc] dark:bg-[#2d2535] px-2 py-0.5 rounded text-[#2b2116] dark:text-[#f6ede0]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-xs text-[#8a7a67] dark:text-[#b5a59c]">
            No language data yet
          </div>
        )}
      </div>
    </div>
  );
}

function DifficultyRow({ label, count, color }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${color.replace('text-', 'bg-')}`} />
        <span className="text-sm font-medium text-[#5d5245] dark:text-[#d7ccbe]">{label}</span>
      </div>
      <span className={`text-sm font-bold ${color}`}>{count}</span>
    </div>
  );
}
