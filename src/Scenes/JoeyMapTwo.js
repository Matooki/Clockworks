class JoeyMapTwo extends Phaser.Scene
{
    constructor()
    {
        super("JoeyMapTwoScene");

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;   // pixels/second
        this.MAX_Y_VEL = 2000;
        this.DRAG = 1000;    
        this.JUMP_VELOCITY = -500;
    }

    preload()
    {
        // load assets
        this.load.path = "./assets/";
        this.load.tilemapTiledJSON("joey2_map", "Joeymap2.json");    // Tiled JSON file
    }

    create()
    {
        let keyNum = 0;
        // add a tile map
        const map = this.add.tilemap("joey2_map");
        // add a tile set to the map
        const tileset = map.addTilesetImage("fullsheet_pack", "1bit_tiles");
        // create a static layer (ie, can't be modified)
        // these have scroll factors set to create JoeyMapTwo layer scrolling
        const bgLayer = map.createStaticLayer("Background", tileset, 0, 0);
        const sceneryLayer = map.createStaticLayer("Scenery", tileset, 0, 0);
        const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);

        // set map collision
        groundLayer.setCollisionByProperty({ collides: true });

        // create player
        const p1Spawn = map.findObject("Objects", obj => obj.name === "P1 Spawn");
        this.p1 = this.physics.add.sprite(p1Spawn.x, p1Spawn.y, "kenney_sheet", 7301);
        // set player physics properties
        this.p1.body.setSize(this.p1.width/2);
        this.p1.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.p1.body.setCollideWorldBounds(true);
        this.p1.scaleY=2;
        this.p1.scaleX=2;

        // generate coin objects from object data
        this.coins = map.createFromObjects("Objects", "coin", {
            key: "kenney_sheet",
            frame: 7298
        }, this);
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.coins.map((coin) => {
            coin.body.setCircle(4).setOffset(4, 4);
        });
        // then add the coins to a group
        this.coinGroup = this.add.group(this.coins);

        // set gravity and physics world bounds (so collideWorldBounds works)
        this.physics.world.gravity.y = 1200;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // create collider(s)/overlap(s)
        this.physics.add.collider(this.p1, groundLayer);
        this.physics.add.overlap(this.p1, this.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            keyNum++;
            this.sound.play('key');
        });

        this.doors = map.createFromObjects("Objects", "door", {
            key: "kenney_sheet",
            frame: 8421
        }, this);

        this.physics.world.enable(this.doors, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.doors.map((door) => {
            door.body.setCircle(4).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.doorGroup = this.add.group(this.doors);

        // set gravity and physics world bounds (so collideWorldBounds works)
        //this.physics.world.gravity.y = 1750;
        //this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // create collider(s)/overlap(s)
        this.physics.add.overlap(this.p1, this.doorGroup, (obj1, obj2) => {
            if(keyNum > 0){
                obj2.destroy(); // remove coin on overlap
                keyNum-=1;
            }
            else{
                this.physics.add.collider(this.p1, this.doorGroup);
            }
        });


        this.slides = map.createFromObjects("Objects", "slide", {
            key: "kenney_sheet",
            frame: 7861
        }, this);

        this.physics.world.enable(this.slides, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.slides.map((slide) => {
            slide.body.setCircle(8).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.slideGroup = this.add.group(this.slides);

        
        this.physics.add.overlap(this.p1, this.slideGroup, (obj1, obj2) => {

            if(doorTime < 700){
                obj2.destroy();
            }
            
                this.physics.add.collider(this.p1, this.slideGroup);
            
        });

      
       


        //creates top half of sliding door
        this.tops = map.createFromObjects("Objects", "top", {
            key: "kenney_sheet",
            frame: 7674
        }, this);

        this.physics.world.enable(this.tops, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.tops.map((top) => {
            top.body.setCircle(8).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.topGroup = this.add.group(this.tops);

       
        this.physics.add.overlap(this.p1, this.topGroup, (obj1, obj2) => {
            if(doorTime < 700){
                obj2.destroy();
                this.plates = map.createFromObjects("Objects", "plate", {
                    key: "kenney_sheet",
                    frame: 8420
                }, this);
        
                this.physics.world.enable(this.plates, Phaser.Physics.Arcade.STATIC_BODY);
                // now use JS .map method to set a more accurate circle body on each sprite
                this.plates.map((plate) => {
                    plate.body.setCircle(4).setOffset(4, 4); 
                });
                // then add the coins to a group
                this.plateGroup = this.add.group(this.plates);
        
                this.physics.add.overlap(this.p1, this.plateGroup, (obj1, obj2) => {
                    
                    down = true;
                    obj2.destroy();
                    
                        this.plates = map.createFromObjects("Objects", "plate", {
                            key: "kenney_sheet",
                            frame: 8419
                        }, this);
                    
                    
                        this.physics.add.collider(this.p1, this.plateGroup);
                    
                });
            }
                this.physics.add.collider(this.p1, this.topGroup);

                this.plates = map.createFromObjects("Objects", "plate", {
                    key: "kenney_sheet",
                    frame: 8420
                }, this);
        
                this.physics.world.enable(this.plates, Phaser.Physics.Arcade.STATIC_BODY);
                // now use JS .map method to set a more accurate circle body on each sprite
                this.plates.map((plate) => {
                    plate.body.setCircle(4).setOffset(4, 4); 
                });
                // then add the coins to a group
                this.plateGroup = this.add.group(this.plates);
        
                this.physics.add.overlap(this.p1, this.plateGroup, (obj1, obj2) => {
                    
                    down = true;
                    obj2.destroy();
                    
                        this.plates = map.createFromObjects("Objects", "plate", {
                            key: "kenney_sheet",
                            frame: 8419
                        }, this);
                    
                    
                        this.physics.add.collider(this.p1, this.plateGroup);
                    
                });
            
        });



        //creates and interacts with pressure plates
        this.plates = map.createFromObjects("Objects", "plate", {
            key: "kenney_sheet",
            frame: 8420
        }, this);

        this.physics.world.enable(this.plates, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.plates.map((plate) => {
            plate.body.setCircle(4).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.plateGroup = this.add.group(this.plates);

        this.physics.add.overlap(this.p1, this.plateGroup, (obj1, obj2) => {
            doorTime = 700;
            down = true;
            obj2.destroy();
            
                this.plates = map.createFromObjects("Objects", "plate", {
                    key: "kenney_sheet",
                    frame: 8419
                }, this);
            
            
                this.physics.add.collider(this.p1, this.plateGroup);
            
        });


        //ladder take you to the next stage
        this.ladders = map.createFromObjects("Objects", "ladder", {
            key: "kenney_sheet",
            frame: 8422
        }, this);

        this.physics.world.enable(this.ladders, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.ladders.map((ladder) => {
            ladder.body.setCircle(4).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.ladderGroup = this.add.group(this.ladders);

        this.physics.add.overlap(this.p1, this.ladderGroup, (obj1, obj2) => {
            this.scene.start("JoeyMapOneScene");
        });
        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p1, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('N');
        this.reload = this.input.keyboard.addKey('R');

        this.shrink=this.input.keyboard.addKey('S');
        this.grow=this.input.keyboard.addKey('G');
    }

    update() {

        if (down){
            doorTime--;
            }
    
            if(doorTime < 0){
                down = false;
                doorTime = 700;
            }

        // player movement
        if(cursors.left.isDown) {
            this.p1.body.setAccelerationX(-this.ACCELERATION);
            this.p1.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.p1.body.setAccelerationX(this.ACCELERATION);
            this.p1.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.p1.body.setAccelerationX(0);
            this.p1.body.setDragX(this.DRAG);
        }
        // player jump
        if(!this.p1.body.blocked.down) {
            // TO-DO: jump animations
            //this.p1.anims.play('jump', true);
        }
        if(this.p1.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.p1.body.setVelocityY(this.JUMP_VELOCITY);
            this.sound.play('jump');
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("JoeyMapOneScene");
        }

        if(Phaser.Input.Keyboard.JustDown(this.shrink)&&scaley!=1)
        {
            scaley=scaley/2;
            scalex=scalex/2;
            this.p1.scaleY=scaley;
            this.p1.scaleX=scalex;
            this.sound.play('shrink');
        }

        if(Phaser.Input.Keyboard.JustDown(this.grow)&&scaley!=4)
        {
            scaley=scaley*2;
            scalex=scalex*2;
            this.p1.scaleY=scaley;
            this.p1.scaleX=scalex;
            this.sound.play('grow');
        }
    }
}