'use client';

import React from 'react';
import Link from 'next/link';
import Badge from '@/shared/components/ui/Badge';

interface SizeSelectorProps {
  size: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ size }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm tracking-wide font-medium">SIZE</h3>
        <Link
          href="/size-guide"
          className="text-sm underline underline-offset-4 hover:no-underline transition"
        >
          Size Guide
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" size="lg">
            {size}
        </Badge>
      </div>
    </div>
  );
};

export default SizeSelector;
