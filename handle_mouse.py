import pyautogui
import time
import math
import tkinter as tk


pyautogui.FAILSAFE = False

def distance(p1, p2):
    return math.hypot(p1[0] - p2[0], p1[1] - p2[1])

class CountdownOverlay:
	def __init__(self, root):
		self.root = root
		self.root.overrideredirect(True)
		self.root.attributes("-topmost", True)
		self.root.wm_attributes("-transparentcolor", "white")
		self.root.config(bg="white")

		self.canvas = tk.Canvas(
			self.root, width=100, height=100, bg="white", highlightthickness=0
		)
		self.canvas.pack()
		self.arc = self.canvas.create_arc(
			10, 10, 90, 90, start=90, extent=0, outline="gray", width=8, style="arc"
		)

		self.running = False
		self.start_time = None
		self.duration = 3.0  # seconds

	def show(self, x, y):
		self.root.geometry(f"+{x - 50}+{y - 50}")
		self.root.deiconify()
		self.running = True
		self.start_time = time.time()
		self.update_arc()

	def hide(self):
		self.running = False
		self.root.withdraw()

	def update_arc(self):
		if not self.running:
			return

		elapsed = time.time() - self.start_time
		if elapsed >= self.duration:
			extent = 360
		else:
			extent = (elapsed / self.duration) * 360

		# Update the arc to sweep clockwise
		self.canvas.itemconfig(self.arc, start=90, extent=-extent)

		if extent < 360:
			self.root.after(50, self.update_arc)

def main():
    idle_time_threshold = 1
    click_threshold = 4
    position_tolerance = 50
    last_position = pyautogui.position()
    last_movement_time = time.time()

    root = tk.Tk()
    overlay = CountdownOverlay(root)
    overlay.hide()

    def update_loop():
        nonlocal last_position, last_movement_time

        current_position = pyautogui.position()
        dist = distance(current_position, last_position)

        if dist > position_tolerance:
            last_movement_time = time.time()
            last_position = current_position
            overlay.hide()
        else:
            idle_time = time.time() - last_movement_time
            if idle_time >= idle_time_threshold and not overlay.running:
                overlay.show(current_position[0], current_position[1])

            if idle_time >= click_threshold:
                print(f"🖱️ Click tại {current_position}")
                pyautogui.click()
                last_movement_time = time.time()
                last_position = current_position
                overlay.hide()

        root.after(50, update_loop)

    print("Đang theo dõi chuột...")
    root.after(0, update_loop)
    root.mainloop()


if __name__ == "__main__":
    main()
