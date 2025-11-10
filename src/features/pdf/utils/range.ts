export function parseRangeExpression(expression: string, maxPage: number): number[] {
  const sanitized = expression.replace(/\s+/g, '');
  if (!sanitized) {
    return [];
  }

  const ranges = new Set<number>();

  sanitized.split(',').forEach((segment) => {
    if (!segment) {
      return;
    }
    const [startRaw, endRaw] = segment.split('-');
    const start = clampPage(Number.parseInt(startRaw, 10), maxPage);
    const end = endRaw ? clampPage(Number.parseInt(endRaw, 10), maxPage) : start;

    if (Number.isNaN(start) || Number.isNaN(end)) {
      return;
    }

    const [from, to] = start <= end ? [start, end] : [end, start];
    for (let page = from; page <= to; page += 1) {
      ranges.add(page);
    }
  });

  return [...ranges].sort((a, b) => a - b);
}

function clampPage(page: number, max: number) {
  if (Number.isNaN(page)) {
    return Number.NaN;
  }
  if (page < 1) {
    return 1;
  }
  if (page > max) {
    return max;
  }
  return page;
}

