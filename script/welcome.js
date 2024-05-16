const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Starfield{
    constructor(){
        this.starfield = [];
        this.numStars = 200;
        this.radius = 1;
        this.speed = 1.01;
        this.CreateStar();
    }

    CreateStar(){
        for (let i = 0; i < this.numStars; i++){
            var position = {'x': Math.random() * canvas.width, 
            'y': Math.random() * canvas.height, 
            'z': Math.random() * canvas.width
            };
            
            this.starfield.push({'position': position});
        }
    }

    Draw(){
        for (let i = 0; i < this.numStars; i++){
            ctx.fillStyle = "rgb(" + (this.starfield[i].position.z).toString() + "," + (this.starfield[i].position.z).toString() + "," + (this.starfield[i].position.z).toString() + ")";
            ctx.beginPath();
            ctx.arc(this.starfield[i].position.x, this.starfield[i].position.y, 
                    this.radius, 
                    0, 2 * Math.PI)
            ctx.fill();
            ctx.closePath();
            
        }
    }

    Update(){

        for (let i = 0; i < this.numStars; i++){
            this.starfield[i].position.x = (this.starfield[i].position.x - canvas.width/2) * this.speed + canvas.width/2;
            this.starfield[i].position.y = (this.starfield[i].position.y - canvas.height/2) * this.speed + canvas.height/2;
    
            if (this.starfield[i].position.x > canvas.width || this.starfield[i].position.x < 0 || this.starfield[i].position.y > canvas.height || this.starfield[i].position.y < 0){
                this.starfield[i].position.x = Math.random() * canvas.width;
                this.starfield[i].position.y = Math.random() * canvas.height;
            }
            this.speed += 0.0001;

            if (this.speed > 1.04){
                this.speed = 1.01;
            }
        }


        this.Draw(); 
    }
}

var starfield = new Starfield();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    starfield.Update();
}
animate();
