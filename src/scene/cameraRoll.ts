import type { Camera, Vector3 } from "three";

/** A display-only quarter turn about the viewing axis. Reapply from lookAt so redraws never accumulate rotation. */
export function applyCameraRoll(camera: Camera, target: Vector3, quarterTurns: number): void {
  camera.lookAt(target);
  camera.rotateZ(quarterTurns * Math.PI / 2);
  camera.updateMatrixWorld();
}
