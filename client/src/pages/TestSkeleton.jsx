import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TestSkeleton = () => {
  return (
    <div className="h-[100vh]">
      <SkeletonTheme baseColor="#3f3f3f" highlightColor duration={1.5}>
        <p>
          <Skeleton count={3} />
        </p>
      </SkeletonTheme>
    </div>
  );
};

export default TestSkeleton;
