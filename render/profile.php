<?php 
  $rand_id = rand(5, 500);
?>
<figure class="mbg-profile-card" id="profile-<?php echo $rand_id; ?>">
  <figcaption style="background-color: <?php echo $bg_color ?>">
    <h3 style="color:<?php echo $change_heading_color ?>;"><?php echo $image_title; ?></h3>
    <h4 style="color:<?php echo $company_color ?>;"><?php echo $founder_name; ?></h4>
    <p style="color:<?php echo $change_text_color ?>;"><?php echo $content; ?></p>
  </figcaption>
  <div class="profile-image"><img src="<?php echo $image_url; ?>"; style="border-radius: <?php echo $img_border; ?>">
    <div class="icons">
      <?php foreach ($social_networks as $icon => $url) { if($url != ''){ ?>
        <a href="<?php echo $url; ?>" target="<?php echo $link_target; ?>"><i style="font-size: <?php echo $icon_size; ?>" class="<?php echo $icon; ?>"></i></a>
      <?php } } ?>
    </div>
  </div>
</figure>
<style>
  #profile-<?php echo $rand_id; ?> figcaption:after {
    border-color: <?php echo $bg_color; ?> transparent transparent transparent;
  }
  #profile-<?php echo $rand_id; ?> i {
    color: <?php echo $icons_color; ?>;
  }
</style>